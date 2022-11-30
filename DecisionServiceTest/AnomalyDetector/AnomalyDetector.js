//AIが時系列データの監視や異常の検出を行うサービス
//このテストではrequest-data.csvにわざと異常な数値を仕込んでいる

"use strict";

const fs = require('fs');
const {parse} = require('csv-parse/sync');
const { AnomalyDetectorClient } = require('@azure/ai-anomaly-detector');
const { AzureKeyCredential } = require('@azure/core-auth');

// Spreadsheet with 2 columns and n rows.
let CSV_FILE = 'DecisionServiceTest/AnomalyDetector/request-data.csv';

// Authentication variables
let key = process.env.AD_key;
let endpoint = process.env.AD_endpoint;

// Points array for the request body
let points = [];

// AnomalyDetectorClient オブジェクトをインスタンス化
let anomalyDetectorClient = new AnomalyDetectorClient(endpoint, new AzureKeyCredential(key));

//ファイル読み取り、データ解析
function readFile() {
    let input = fs.readFileSync(CSV_FILE).toString();
    let parsed = parse(input, { skip_empty_lines: true });

    parsed.forEach(function (e) {
        points.push({ timestamp: new Date(e[0]), value: parseFloat(e[1]) });
    });
}
readFile()

//データ セット全体で異常を検出
async function batchCall() {
    // Create request body for API call
    let body = { series: points, granularity: 'daily' }
    // Make the call to detect anomalies in whole series of points
    await anomalyDetectorClient.detectEntireSeries(body)
        .then((response) => {
            console.log("データ セット全体で異常を検出----------");
            for (let item = 0; item < response.isAnomaly.length; item++) {
                if (response.isAnomaly[item]) {
                    console.log("An anomaly was detected from the series, at row " + item)
                }
            }
        }).catch((error) => {
            console.log(error)
        })

}
batchCall()


//最新のデータ ポイントの異常状態を検出
async function lastDetection() {
    let body = { series: points, granularity: 'daily' }
    // Make the call to detect anomalies in the latest point of a series
    await anomalyDetectorClient.detectLastPoint(body)
        .then((response) => {
            console.log("最新のデータ ポイントの異常状態を検出----------");
            if (response.isAnomaly) {
                console.log("The latest point, in row " + points.length + ", is detected as an anomaly.")
            } else {
                console.log("The latest point, in row " + points.length + ", is not detected as an anomaly.")
            }
        }).catch((error) => {
            console.log(error)
        })
}
lastDetection()

//データセット内の変化点を検出する
async function changePointDetection() {
    let body = { series: points, granularity: 'daily' }
    // get change point detect results
    await anomalyDetectorClient.detectChangePoint(body)
        .then((response) => {
            console.log("データセット内の変化点を検出する----------");
            if (
                response.isChangePoint.some(function (changePoint) {
                    return changePoint === true;
                })
            ) {
                console.log("Change points were detected from the series at index:");
                response.isChangePoint.forEach(function (changePoint, index) {
                    if (changePoint === true) {
                        console.log(index);
                    }
                });
            } else {
                console.log("There is no change point detected from the series.");
            }
        }).catch((error) => {
            console.log(error)
        })
}
changePointDetection();