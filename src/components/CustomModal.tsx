import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Modal, Text, TextInput } from 'react-native-paper';

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setCode: (code: string) => void;
    onSaveTracking: () => void;
    error: boolean;
}

const CustomModal = ({visible, setVisible, setName, setDescription, setCode, error, onSaveTracking}: Props) => {
    return (
        <Modal
                visible={visible}
                dismissable
                onDismiss={() => setVisible(false)}
                >
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        margin: 20,
                        borderRadius: 15
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 10
                        }}>
                            Agrega tu nuevo paquete
                        </Text>
                        <Divider style={{ backgroundColor: '#46AFB9', height: 2, borderRadius: 10 }}/>
                        <Text style={{
                            fontSize: 14,
                            marginTop: 10,
                        }}>
                            *Nombre del paquete:
                        </Text>
                        <TextInput 
                        mode='outlined'
                        outlineStyle={{ borderColor: '#46AFB9', borderRadius: 10 }}
                        placeholder='Ingrese el nombre del paquete'
                        placeholderTextColor={'gray'}
                        onChangeText={text => setName(text)}
                        />
                        <Text style={{
                            fontSize: 14,
                            marginTop: 10
                        }}>
                            Descripcion del paquete (opcional):
                        </Text>
                        <TextInput 
                        mode='outlined'
                        outlineStyle={{ borderColor: '#46AFB9', borderRadius: 10 }}
                        placeholder='Ingresa una descripcion de tu paquete'
                        placeholderTextColor={'gray'}
                        onChangeText={text => setDescription(text)}
                        />
                        <Text style={{
                            fontSize: 14,
                            marginTop: 10
                        }}>
                            *Numero de rastreo:
                        </Text>
                        <TextInput 
                        mode='outlined'
                        outlineStyle={{ borderColor: '#46AFB9', borderRadius: 10 }}
                        placeholder='Ingresa el numero de rastreo'
                        placeholderTextColor={'gray'}
                        autoCapitalize='characters'
                        onChangeText={text => setCode(text)}
                        />
                        <Divider style={{ backgroundColor: '#46AFB9', height: 2, borderRadius: 10, marginTop: 20, marginBottom: error ? 0 : 20 }}/>
                        { error && (
                            <Text style={{
                                marginVertical: 20,
                                color: '#46AFB9',
                            }}>
                                No has rellenado todos los campos obligatorios
                            </Text>
                        )}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button
                            mode='elevated'
                            buttonColor='gray'
                            textColor='white'
                            style={{ marginRight: 10 }}
                            labelStyle={{ fontSize: 16, fontWeight: 'bold' }} 
                            onPress={() => {
                                setVisible(false);
                            }}
                            >
                                Cancelar
                            </Button>
                            <Button
                            mode='elevated'
                            buttonColor='#46AFB9'
                            textColor='white'
                            labelStyle={{ fontSize: 16, fontWeight: 'bold' }} 
                            onPress={() => {
                                onSaveTracking();
                            }}
                            >
                                Agregar
                            </Button>
                        </View>
                    </View>
                </Modal>
    )
}

export const CustomModalMemo = React.memo(CustomModal);