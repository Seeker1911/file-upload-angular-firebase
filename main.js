// service firebase.storage {
//   match /b/seekertodoapp.appspot.com/o {
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
    
    .controller('UploadCtrl', function($scope) {
        const up = this

        up.heading = 'Share your photos with the world!'
        up.photoURLs = []


        up.submit = function() {
            const input = document.querySelector('[type="file"]')
            const file = input.files[0]
            console.dir(file)
            //upload to firebase and name the file 123.jpg
            const uploadTask = firebase.storage().ref().child('123.jpg').put(file)

            //1st argument is upload, 2nd on error, 3rd is callback, check firebase docs. 
            uploadTask.on('state_changed', null, null, ()=>{
            	up.photoURLs.push(uploadTask.snapshot.downloadURL)
            	up.file = ''
            	$scope.$apply()
            	console.log("upload", uploadTask.snapshot.downloadURL);
            })
        }
    })
function uploadFile (file, path) {
	 return new Promise ((resolve, reject) {
	 	const uploadTask = firebase.storage().ref()
	 		.child(path).put(file)

	 		uploadTask.on('state_changed', null, reject, ()=> 
	 			resolve(uploadTask.snapshot)
	 			)
	 }) 
}





