import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function EmpleadosScreen() {

    const [datos, setDatos] = useState([])

    const API_EMPLEADOS = 'https://api.sampleapis.com/futurama/characters'

    useEffect(() => {

        fetch(API_EMPLEADOS)
        .then(  ( response )=> response.json() )
        .then(  ( data  )=>  setDatos(data) )
        .catch( (error)=> console.log(error))
        
       // console.log(datos)
    
    }, [])

    type empleado={
        name: string,
        images: string,
        species: string
    }
    

    return (
        <View>
            <Text>EmpleadosScreen</Text>
            <FlatList 
                data={ datos }
                renderItem={ ( {item} : {item:empleado} ) =>(
                    <View>
                        <Text>Nombre: {item.name.first}</Text>
                        <Text>Especie: {item.species}</Text>
                        <Image source={{ uri:  item.images.main}} style={styles.img}/>
                    </View>
                ) } 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width:100,
        height:100,
        resizeMode:'contain'
    }
})