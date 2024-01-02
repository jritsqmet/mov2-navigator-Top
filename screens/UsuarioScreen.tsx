import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../config/Config';


export default function UsuarioScreen() {

  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [ciudad, setCiudad] = useState('')

  const [datos, setDatos] = useState([])


  //CREATE - SET - GUARDAR 
  function guardar(cedula: string, nombre: string, ciudad: string) {
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      city: ciudad,
    });
  }

  ///READ - onValue - LEER
  useEffect(() => {

    function leer() {
      const starCountRef = ref(db, 'usuarios/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        //adaptar
        const dataTemp: any = Object.keys(data).map((key) => ({
          key, ...data[key]
        }))

        setDatos(dataTemp)
        console.log(dataTemp)

      });
    }

    leer()
  }, [])


  //UPDATE - UPDATE - ACTUALIZAR
  function actualizar(cedula: string, nombre: string, ciudad: string) {
    update(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      city: ciudad,
    });
  }

  //DELETE - REMOVE - ELIMINAR
  function eliminar(cedula: string) {
    remove(ref(db, 'usuarios/' + cedula))
  }

  return (
    <View>
      <Text>UsuarioScreen</Text>
      {/*############################ CREAR  #######################*/}

      <TextInput
        placeholder='Ingrese cédula'
        onChangeText={(texto) => setCedula(texto)}
      />

      <TextInput
        placeholder='Ingrese nombre'
        onChangeText={(texto) => setNombre(texto)}
      />

      <TextInput
        placeholder='Ingrese ciudad'
        onChangeText={(texto) => setCiudad(texto)}
      />
      <Button title='Guardar' onPress={() => guardar(cedula, nombre, ciudad)} />

      {/*################### EDITAR  ########################*/}
      <View style={{ borderWidth: 1, width: "100%", marginTop: 10 }} />
      <Text>EDITAR</Text>

      <TextInput
        placeholder='Ingrese cédula'
        onChangeText={(texto) => setCedula(texto)}
      />

      <TextInput
        placeholder='Ingrese nombre'
        onChangeText={(texto) => setNombre(texto)}
      />

      <TextInput
        placeholder='Ingrese ciudad'
        onChangeText={(texto) => setCiudad(texto)}
      />
      <Button title='Editar' onPress={() => actualizar(cedula, nombre, ciudad)} color={'green'} />

      {/*################### ELIMINAR  ########################*/}
      <View style={{ borderWidth: 1, width: "100%", marginTop: 10 }} />
      <Text>ELIMINAR</Text>

      <TextInput
        placeholder='Ingrese cédula'
        onChangeText={(texto) => setCedula(texto)}
      />
      <Button title='ELIMINAR' onPress={() => eliminar(cedula) } color={'red'} />



      {/*################### LEER  ########################*/}
      <View style={{ borderWidth: 1, width: "100%", marginTop: 10 }} />

      <FlatList
        data={datos}
        renderItem={({ item }) => (
          <View>
            <Text>Cedula: {item.key}</Text>
            <Text>Nombre: {item.name}</Text>
            <Text>Ciudad: {item.city}</Text>
          </View>
        )}
      />


    </View>
  )
}

const styles = StyleSheet.create({})