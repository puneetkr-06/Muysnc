import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider ,setPersistence, browserLocalPersistence} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXfysKEjppY1P_a1op1ojE6od3-YvNY80",
  authDomain: "musync-152c2.firebaseapp.com",
  projectId: "musync-152c2",
  storageBucket: "musync-152c2.appspot.com",
  messagingSenderId: "294924077736",
  appId: "1:294924077736:web:5ef00a7eff15ce7b06d09d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence);

export {auth, provider};
