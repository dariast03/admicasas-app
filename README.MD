CONFIGURACION AUTENTICACION GOOGLE

android/build.gradle

buildscript {
ext {
......
googlePlayServicesAuthVersion = "19.2.0"
}

    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
        ......
    }

}
