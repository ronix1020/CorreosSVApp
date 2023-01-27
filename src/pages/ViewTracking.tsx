import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Snackbar, Surface, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/RootNavigation';
import { getTracking } from '../services/getTracking';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TrackingInterface } from '../interfaces/TrackingInterface';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateTime } from 'luxon';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewTracking'>

const ViewTracking = ({ navigation, route }: Props) => {
    const { name, code, date, description } = route.params;
    const [copied, setCopied] = useState(false);
    const [response, setResponse] = useState<TrackingInterface>()

    useEffect(() => {
        getDataTracking()
    }, [])

    const getDataTracking = async() => {
        await getTracking(code).then((res) => {
            console.log('Respuesta del tracking', res)
            setResponse(res)
        }).catch((err) => {
            console.log('Error del tracking',err)
        })
    }
    
    return (
        <SafeAreaView style={ styles.container }> 
            <View style={ styles.secondaryContainer }>
                <Text style={ styles.titleTracking }>
                    { name }
                </Text>
                <Button 
                mode='elevated'
                style={ styles.copyCodeButton } 
                onPress={() => {
                    Clipboard.setString(code);
                    setCopied(true);
                }}>
                    <Text style={ styles.textCodeButton }>{code}</Text>
                    <Icon name="content-copy" size={20} color="#378991" />
                </Button>
                { response ? (
                    <>
                        <View style={ styles.cardMainMessage }>
                            <Text style={ styles.textMainMessage }>
                                Mensaje Principal
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                {response.mensajeAmigable}
                            </Text>
                        </View>
                        <View style={ styles.detailsTracking }>
                            <Text style={ styles.detailTrackingText }>
                                { response.envio.clase }
                            </Text>
                            <Text style={ styles.detailTrackingText }>
                                Peso: { response.envio.peso } kg
                            </Text>
                            <Text style={ styles.detailTrackingText }>
                                Pais Origen: { response.envio.paisOrigen }
                            </Text>
                            <Text style={ styles.detailTrackingText }>
                                Pais Destino: El Salvador
                            </Text>
                        </View>
                        <View style={ styles.cardMainMessage }>
                            <Text style={ styles.textMainMessage }>
                                Eventos
                            </Text>
                            <ScrollView contentContainerStyle={ styles.scrollView }>
                                { response.eventos && response.eventos.map((item, index) => (
                                    <Surface key={index} style={ styles.cardDetails }>
                                        <Surface style={ styles.dateDetails }>
                                            <Text style={ styles.titleTextDetails }>
                                                Fecha: 
                                            </Text>
                                            <Text style={ styles.subtitleTextDetails }>
                                                { DateTime.fromISO(item.fecha.toString()).toFormat('dd/MM/yyyy') }
                                            </Text>
                                        </Surface>
                                        <View style={ styles.descriptionDetails }>
                                            <Text style={ styles.titleTextDetails }>
                                                Descripcion: 
                                            </Text>
                                            <Text style={ styles.subtitleTextDetails }>
                                                { item.descripcion }
                                            </Text>
                                        </View>
                                        <View style={ styles.lugarDetails }>
                                            <Text style={ styles.titleTextDetails }>
                                                Lugar del evento: 
                                            </Text>
                                            <Text style={ styles.subtitleTextDetails }>
                                                { item.oficina }
                                            </Text>
                                        </View>
                                    </Surface>
                                ))}
                            </ScrollView>
                        </View>
                    </>
                ) : (
                    <ActivityIndicator size={'large'} animating={true} color="#378991" />
                )}
            </View>
            <Snackbar
            visible={copied}
            duration={2000}
            style={ styles.snackbar }
            onDismiss={() => setCopied(false)}>
                <Text style={{ textAlign: 'center' }}>
                    Código copiado al portapapeles
                </Text>
            </Snackbar>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    secondaryContainer: {
        marginHorizontal: 20 
    },
    titleTracking: {
        fontWeight: 'bold',
        color: '#1e494e',
        fontSize: 20
    },
    copyCodeButton: {
        flexDirection: 'row',
        marginVertical: 10,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center'    
    },
    textCodeButton: {
        fontWeight: 'bold',
        marginVertical: 15,
        marginBottom: 10
    },
    cardMainMessage: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white'
    },
    textMainMessage: {
        fontWeight: 'bold',
        color: '#1e494e',
        fontSize: 16,
        textAlign: 'center'
    },
    detailsTracking: {
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
    },
    detailTrackingText: {
        fontWeight: 'bold',
        color: '#1e494e',
        fontSize: 14
    },
    scrollView: {
        marginVertical: 20,
        marginHorizontal: 10
    },
    cardDetails: {
        padding: 10, 
        marginBottom: 20,
        borderRadius: 15, 
        backgroundColor: 'white' 
    },
    dateDetails: {
        flexDirection: 'row', 
        top: -20, 
        backgroundColor: 'white', 
        borderRadius: 30,
        alignSelf: 'center',
        padding: 10
    },
    titleTextDetails: {
        marginRight: 3, 
        fontWeight: 'bold', 
        color: '#1e494e', 
        fontSize: 14
    },
    subtitleTextDetails: {
        color: '#1e494e', 
        fontSize: 14
    },
    descriptionDetails: {
        flexDirection: 'row', 
        width: '70%', 
        marginBottom: 10
    },
    lugarDetails: {
        flexDirection: 'row',
         width: '70%'
    },
    snackbar: {
        backgroundColor: 'white', 
        marginHorizontal: 30, 
        borderColor: '#378991', 
        borderWidth: 2, 
        borderRadius: 10
    }
})

export default ViewTracking;