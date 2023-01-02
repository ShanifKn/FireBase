import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const Crud = () => {
  const [newName, setNewName] = useState("");
  const [Age, setAge] = useState("");
  const [user, setUsers] = useState([]);
  const userCollection = collection(db, "user");

  const createUser = async () => {
    await addDoc(userCollection, { Name: newName, Age: Number(Age) });
  };

  const updateUser = async (id, Age) => {
    const userDoc = doc(db, "user", id);
    const newFields = { Age: Age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Name...."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      {user.map((user) => {
        return (
          <div>
            <h1>Name:{user.Name}</h1>
            <h1>Age:{user.Age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.Age);
              }}>
              +
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}>
              Delte
            </button>
          </div>
        );
      })}
    </div>
  );
};
