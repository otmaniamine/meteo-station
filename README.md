# Smart Weather Station (WeatherENSTA)

An end-to-end environmental monitoring system combining IoT (ESP32), a custom DIY anemometer, a serverless cloud data pipeline with Google Sheets and Google Apps Script, time-series forecasting via a Recurrent Neural Network (Deep Learning LSTM), and a responsive interactive web dashboard built with React, TypeScript, and Tailwind CSS.

## Table of Contents

* [Project Overview](#project-overview)

* [Key Features](#key-features)

* [System Architecture](#system-architecture)  

* [1. Hardware and Electronics](#1-hardware-and-electronics)

  * [Components](#components)

  * [Custom DIY Anemometer Design](#custom-diy-anemometer-design)

  * [Wiring and Circuitry](#wiring-and-circuitry)

* [2. IoT Data Pipeline](#2-iot-data-pipeline)

  * [Data Flow](#data-flow)

  * [Data Validation and Cleaning](#data-validation-and-cleaning)

* [3. Artificial Intelligence and Predictions](#3-artificial-intelligence-and-predictions)

  * [LSTM Network Architecture](#lstm-network-architecture)

  * [Model Training and Evaluation](#model-training-and-evaluation)

  * [Automated Inference Pipeline](#automated-inference-pipeline)

* [4. Web Dashboard and User Interface](#4-web-dashboard-and-user-interface)

* [Getting Started](#getting-started)

  * [ESP32 Firmware](#esp32-firmware)

  * [AI Model (Python)](#ai-model-python)

  * [Web Frontend (React)](#web-frontend-react)

* [Project Team](#project-team)

* [License](#license)

## Project Overview

Developed as an engineering capstone project at the National Higher School of Advanced Technologies (ENSTA), this autonomous station monitors localized weather parameters in real time. Collected telemetry is uploaded to the cloud, cleaned for anomaly detection, used by an LSTM neural network to forecast subsequent temperatures, and rendered on an interactive dashboard.

## Key Features

* Multi-Sensor Telemetry: Real-time acquisition of ambient temperature, relative humidity, light intensity, precipitation state, wind speed, and 8-point wind direction.

* Custom Hall-Effect Anemometer: Non-contact rotation detection using high-sensitivity Hall-effect sensors and neodymium magnets.

* Serverless Cloud Logging: Direct HTTP GET logging to Google Sheets via Google Apps Script without third-party broker dependencies.

* Predictive Analytics (Deep Learning): An LSTM recurrent network trained on sequential weather datasets to forecast temperature steps ahead ($t+1$).

* Web Interface: Interactive map (Leaflet), dynamic charts (Chart.js / D3.js), historical daily tables, and responsive mobile layout.

## System Architecture

```
  +------------------+         HTTP GET          +--------------------+
  | Sensors + ESP32  | ----------------------->  | Google Apps Script |
  +------------------+       (Wi-Fi / JSON)      +--------------------+
           |                                                |
     Direct Sensor                                     Append Row
        Readings                                            v
           |                                     +--------------------+
           |                                     | Google Sheets (DB) |
           |                                     +--------------------+
           |                                           ^        |
           |                               Read recent |        | Read data
           v                                   samples |        v
  +------------------+       Batch Update        +--------------------+
  |   AI Inference   | ------------------------> | Dashboard Frontend |
  | (LSTM Model .py) |     (Predicted Temp)      | (React/Tailwind)   |
  +------------------+                           +--------------------+

```

## 1. Hardware and Electronics

### Components

| Component | Role / Description | ESP32 Interface | 
 | ----- | ----- | ----- | 
| ESP32 NodeMCU | Dual-core 240 MHz MCU with integrated 2.4 GHz Wi-Fi / BLE | \- | 
| DHT11 | Digital ambient temperature ($0-50^\circ\text{C}$) & humidity ($20-90\%$) sensor | `GPIO 5` | 
| LDR (Photoresistor) | Ambient light measurement converted to a 0-100% scale | `GPIO 4` (ADC) | 
| Rain Sensor Module | Threshold-based precipitation detection | `GPIO` (Digital) | 
| Hall Effect Sensors | 1x for wind speed rotation count, 4x for wind cardinal direction | `GPIO 13, 15, 18, 21, 22` | 
| 18650 Li-ion Battery | $2500\,\text{mAh}$ / $3.7\,\text{V}$ nominal ($4.2\,\text{V}$ fully charged) | Power Source | 
| TP4056 Module | Charge controller with overcharge, overdischarge, and short-circuit protection | \- | 

### Custom DIY Anemometer Design

The anemometer uses a low-friction metallic axis coupled with a 4-cup rotor and permanent neodymium magnets, reading rotations through Hall-effect sensors (TLE4905L).

#### Wind Speed Calculation

* Rotor Diameter: $D = 0.29\,\text{m}$ $\rightarrow$ Circumference: $C = \pi \times D \approx 0.91\,\text{m}$.

* Sampling Interval: $\Delta t = 10\,\text{seconds}$.

* Linear wind speed is calculated by:

$$
V_{\text{wind}}\ (\text{m/s}) = \left(\frac{\text{Rotations}}{\Delta t}\right) \times C \times K_{\text{efficiency}}
$$

*(with* $K_{\text{efficiency}} = 2.5$ *accounting for aerodynamic drag and mechanical friction)*.

#### Wind Direction System

Four Hall sensors are oriented in a cross pattern (North, South, East, West). When the magnet passes between two cardinal points, adjacent sensors activate simultaneously, resolving 8 distinct directions: `N`, `N-E`, `E`, `S-E`, `S`, `S-W`, `W`, and `N-W`.
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/anemometre%20design%20for%20direction%20and%20speed.png)

### Wiring and Circuitry

The electronics are housed inside a semi-open, weather-resistant PVC enclosure ensuring continuous airflow for DHT11 accuracy while protecting circuitry from moisture and direct dust exposure.
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/shema.png)
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/final%20coception.png)

## 2. IoT Data Pipeline
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/IOT.png)

### Data Flow

1. Sampling: The ESP32 polls sensors every 10 seconds.

2. Ingestion: A formatted HTTP GET request is dispatched over Wi-Fi to a Google Apps Script deployment:

   ```
   https://script.google.com/macros/s/<GAS_ID>/exec?temperature=24.5&humidity=65&luminosity=80&wind_direction=N-E&wind_speed=2.1
   
   ```

3. Storage: The script parses parameters, timestamps the entry according to the local timezone (`Africa/Algiers`), and appends a row to Google Sheets.

### Data Validation and Cleaning

To filter transient communication faults and hardware noise:

* Outlier rejection: Values outside physical thresholds (e.g., temperatures above $60^\circ\text{C}$ or below $-20^\circ\text{C}$) are replaced with fallback historical values.

* Sanitization: Automatic normalization of decimal separators (replacing commas with periods) and removal of non-breaking spaces before numerical processing.

## 3. Artificial Intelligence and Predictions

### LSTM Network Architecture

A Long Short-Term Memory (LSTM) recurrent network was implemented using TensorFlow and Keras to capture temporal dependencies in historical weather patterns.

* Training Data: Hourly sequence records from the standardized *Jena Climate Dataset* ($2009-2016$).

* Normalization: Features scaled using `MinMaxScaler` in the interval $[0, 1]$.

* Input Window: Sequence length $L = 144$ time steps to predict $1$ step ahead ($t+1$).

```
Model: "Sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 lstm (LSTM)                 (None, 64)                17408     
 dense (Dense, ReLU)         (None, 8)                 520       
 dense_1 (Dense, Linear)     (None, 1)                 9         
=================================================================
Total params: 17,937 (Trainable params: 17,937)

```

### Model Training and Evaluation

* Optimizer: Adam

* Loss Function: Mean Squared Error (MSE)

* Validation Metric: Mean Absolute Error (MAE)

* Evaluation Metrics:

  * MAE: $0.18^\circ\text{C}$

  * RMSE: $0.26^\circ\text{C}$

  * $R^2$ Score: $\approx 0.98$
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/train%20ai%20prediction%20test.png)

### Automated Inference Pipeline

A Python automation service bridges live telemetry and the trained neural network:

1. Fetches the latest 144 records from Google Sheets via the `gspread` service account API.

2. Applies the stored training scalar transformation.

3. Computes `model.predict(input_window)`.

4. Writes the predicted values back to Google Sheets via batch updating for dashboard display.

## 4. Web Dashboard and User Interface
![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/weather%20station%20ensta%20landing%20page%20of%20website.png)

The frontend provides real-time situational awareness and analytical trends for end users.

* Tech Stack: React, TypeScript, Tailwind CSS, Chart.js, Leaflet.

* Functional Modules:

  * Interactive Geo-Map: Visualizes geographical location and current conditions.

  * Live Sensor Charts: Historical and real-time trends for temperature, humidity, and wind.

  * AI Predictions Panel: Displays projected temperature variations.

  * Historical Summary: Tabular records organized by day.
  ![alt text](https://github.com/otmaniamine/meteo-station/blob/main/figures/interface%20of%20website.png)

## Getting Started

### ESP32 Firmware

1. Open the `firmware/` project in the Arduino IDE or PlatformIO.

2. Install dependencies via the Library Manager:

   * `DHT sensor library` (Adafruit)

   * `WiFi` and `HTTPClient` (ESP32 core)

3. Update network credentials in the sketch:

   ```
   const char* ssid = "YOUR_WIFI_SSID";
   const char* password = "YOUR_WIFI_PASSWORD";
   String GAS_ID = "YOUR_GOOGLE_APPS_SCRIPT_ID";
   
   ```

4. Flash the code to your ESP32 board.

### AI Model (Python)

1. Navigate to the AI directory:

   ```
   cd ai_model
   
   ```

2. Install requirements:

   ```
   pip install tensorflow numpy pandas scikit-learn matplotlib gspread google-auth
   
   ```

3. Place your Google Cloud Service Account key as `credentials.json`.

4. Run the inference routine:

   ```
   python predict_and_sync.py
   
   ```

### Web Frontend (React)

1. Navigate to the frontend directory:

   ```
   cd frontend
   
   ```

2. Install NPM dependencies:

   ```
   npm install
   
   ```

3. Start the local development server:

   ```
   npm run dev
   
   ```

## Project Team

Developed by engineering students at the National Higher School of Advanced Technologies (ENSTA):

* OTMANI Mohamed Amine

* LADJOUZI Adam

* DJABALLAH Akram

* LERHLERH / LEGHLEGH Soundous

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/otmaniamine/meteo-station/blob/main/LICENSE.md) file for details.
