// Firebase Storage Rules:
//
// service firebase.storage {
//   match /b/angular-file-upload-ae72b.appspot.com/o {
//     match /{allPaths=**} {
//       allow read, write;
//     }
//   }
// }

angular.module('app', [])
  .config(() => (
    firebase.initializeApp({
      apiKey: "AIzaSyAbqH63zosJ9pxiF-N3sI0jJR2_esbEuA8",
            authDomain: "seekertodoapp.firebaseapp.com",
            databaseURL: "https://seekertodoapp.firebaseio.com",
            storageBucket: "seekertodoapp.appspot.com",
  })))
  .controller('UploadCtrl', function ($timeout, uploadFactory) {
    const up = this

    up.heading = 'Share your photos with the world!'
    up.photoURLs = []

    up.submit = function () {
      const input = document.querySelector('[type="file"]')
      const file = input.files[0]

      const randomInteger = Math.random() * 1e17
      const getFileExtension = file.type.split('/').slice(-1)[0]
      const randomPath = `${randomInteger}.${getFileExtension}`

      uploadFactory.send(file, randomPath)
        .then(res => {
          up.photoURLs.push(res.downloadURL)
          return res.downloadURL
        })
        .then((url) => {
          firebase.database().ref('/images').push({url})
        })
    }
  })
  .factory('uploadFactory', ($timeout) => ({
    send (file, path = file.name) {
      return $timeout().then(() => (
        new Promise ((resolve, reject) => {
          const uploadTask = firebase.storage().ref()
            .child(path).put(file)

          uploadTask.on('state_changed',
            null,
            reject,
            () => resolve(uploadTask.snapshot)
          )
        })
      ))
    }
  }))
