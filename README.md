# Aimf app

## 1.Requirements

* Git
* Node or Yarn

## 2.Installation

* Install [npm](https://www.npmjs.com/get-npm)
* Install [Yarn](https://yarnpkg.com/fr/docs/install#debian-stable)
* Install [Git](https://git-scm.com/book/fr/v1/D%C3%A9marrage-rapide-Installation-de-Git)


- Get the project : 
```
git clone git@github.com:ilyeSudo/AIMFAPP.git
``` 

- Get and install dependencies :
``` 
cd AIMFAPP/
yarn install
```
- Install Android Studio

- Configure Android SDK BUILD :

In Tools->SDK Manager click on SDK Tools -> check Show Package Details -> Select version 28.0.3 of Android SDK Build

- In windows add the path to platform-tools path to the path environment variable. Exemple: /c/Users/<user names>/AppData/Local/Android/Sdk/platform-tools

- Create environnements variables :
```shell
export ANDROID_SDK_ROOT="path to Sdk" # exemple /c/Users/<user names>/AppData/Local/Android/Sdk in widows 
export JAVA_HOME="path to ja va" # exemple /c/Program\ Files\ \(x86\)/Common\ Files/Oracle/Java/javapath/java.exe in windows 
```

- Create debug.keystore file :
```shell
path to keytool.exe -genkey -dname "CN=Unknown,O=Unknown,C=Unknown" -keystore  android/app/debug.keystore  -keysize 1024 -alias androiddebugkey -validity 14000 -keypass android -storepass android
```

- Create a new .env file from .env.example and put your ip private address with 8080 port in API_BASE_URL variable (ex : http://192.168.0.23:8080) 
- Start the react server
```
react-native start
```
- Build the aimf app (Before do this, you must be sure you have an android emulator configured or a device connected to your machine):
```
react-native run-android
```
Note : after switch between branch, it's recommended to refresh env with this command :
```
sudo npm run refresh:env
```
Pour react-native-camera
Modifying build.gradle
Modify the following lines in android/app/build.gradle:

android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'mlkit' // <--- replace general with mlkit
  }
}
