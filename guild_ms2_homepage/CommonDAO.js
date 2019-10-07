

class User{
    constructor(){

    }
}

class Firebase{
    constructor(){
        var firebaseConfig = {
            apiKey: "AIzaSyB7Bd4GnGfPz1CEOKY16TEGVcc8lf0Q-vA",
            authDomain: "ms2-bishop-skilful-air-169101.firebaseapp.com",
            databaseURL: "https://ms2-bishop-skilful-air-169101.firebaseio.com",
            projectId: "ms2-bishop-skilful-air-169101",
            storageBucket: "",
            messagingSenderId: "400364465679",
            appId: "1:400364465679:web:a09a0583c36cfccc883d7a",
            measurementId: "G-WMTXBF0PY9"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        
        this.database = firebase.database();
    }

    writeUserData(user_id, user_pw, user_name, user_email){
        this.database.ref('db_ms2_gulid/user/' + user_id).set(
            {
                user_id : user_id,
                user_pw : user_pw,
                user_name : user_name,
                user_email : user_email
            }
        )
    }
    
}

class Program{
    
}