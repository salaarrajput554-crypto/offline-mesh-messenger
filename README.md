# Offline Mesh Messenger

A mobile-first messaging app concept designed for offline communication using Bluetooth, mesh relay, and satellite fallback when there is no internet.

## Core idea

This app is inspired by WhatsApp-style messaging but built for environments where connectivity is unreliable or absent. The product is designed around:

- Bluetooth-based short-range messaging
- Device-to-device meshed relay
- Satellite fallback for emergency or long-range communication
- Encrypted local-first message storage
- No internet dependency when nearby peers are available

## Features included in the starter app

- Offline-first dashboard
- Messaging conversation list
- Relay network panel
- Emergency SOS flow
- Bluetooth and satellite toggle controls
- Modern dark UI inspired by messaging apps

## Recommended stack

This starter version uses:

- React Native + Expo
- TypeScript
- Mobile-first UI design

For production, this app can evolve into:

- Android native Bluetooth APIs
- iOS CoreBluetooth integration
- Mesh networking protocol
- AES / Signal-style encryption
- Satellite API integration or hardware modem support

## Run locally

1. Install dependencies:
   npm install

2. Start the app:
   npm start

3. Run on device or simulator:
   - npm run android
   - npm run ios
   - npm run web

## MVP roadmap

### Phase 1
- Local Bluetooth messaging
- Contact discovery
- Secure local storage
- Offline message queue

### Phase 2
- Mesh relay between multiple nearby devices
- Group chat support
- Voice notes
- File transfer

### Phase 3
- Satellite backup messaging
- SOS and emergency relay
- GPS sharing
- Remote admin / gateway support

## Important note

A full WhatsApp-style experience with video calls over satellite is technically difficult and expensive. The realistic MVP should focus on:

- text messaging
- voice notes
- emergency relay
- Bluetooth + mesh communication
- satellite fallback

This project is a strong foundation for that idea.
