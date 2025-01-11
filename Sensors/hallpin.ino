const int hallPin = 2; // Pin connected to Hall effect sensor

void setup() {
  Serial.begin(9600);
  pinMode(hallPin, INPUT_PULLUP);
}

void loop() {
  int sensorState = !digitalRead(hallPin);
  Serial.println(sensorState);
  delay(100); // Check every 100ms
}
