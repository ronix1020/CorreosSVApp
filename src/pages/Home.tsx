import React, {useRef, useState} from 'react';
import {Dimensions, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {Appbar, Button, Snackbar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemTracking,
  deleteItemTracking,
  ItemTracking,
} from '../redux/slices/tracking';
import {CustomModalMemo} from '../components/CustomModal';
import Clipboard from '@react-native-clipboard/clipboard';
import {DateTime} from 'luxon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import {StyleSheet} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';

interface StoreInterface {
  tracking: {
    items: ItemTracking[];
  };
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation, route}: Props) => {
  const {top} = useSafeAreaInsets();
  const tracking = useSelector((state: StoreInterface) => state.tracking);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const swipeableRef = useRef(null);
  const dispatch = useDispatch();

  const onSaveTraking = () => {
    console.log('guardado');
    if (name === '' && code === '') {
      setError(true);
      return;
    }
    dispatch(
      addItemTracking({
        name: name,
        description: description,
        code: code,
        date: DateTime.now().toFormat('dd/MM/yyyy HH:mm'),
      }),
    );
    setVisible(false);
  };

  const deleteItem = (code: string) => {
    // borra el item del array de redux
    dispatch(deleteItemTracking(code));
    swipeableRef.current = null;
    console.log('eliminado');
  };

  const renderDeleteButton = (code: string) => {
    return (
      <TouchableOpacity
        onPress={() => deleteItem(code)}
        style={ style.deleteButtonContainer }>
        <View
          style={ style.deleteButton }>
          <Icon name="trash-can" size={30} color="#fff" />
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Eliminar</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (tracking.items.length > 0) {
    return (
      <View style={{...style.container, paddingTop: top}}>
        <StatusBar translucent barStyle={'light-content'} />
        <Appbar>
          <Appbar.Content
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
            title="Correos SV"
            titleStyle={{fontWeight: 'bold'}}
          />
          <Appbar.Action
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
            icon="archive-plus"
            color="#378991"
            onPress={() => {
              setVisible(true);
            }}
          />
        </Appbar>
        <View style={style.secondaryContainer}>
          <Text style={style.textTitleContainer}>Tus paquetes</Text>
            <FlatList
              style={{height: Dimensions.get('window').height - 200}}
              data={tracking.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <Swipeable
                    key={index}
                    ref={swipeableRef}
                    renderRightActions={() => renderDeleteButton(item.code)}
                    onSwipeableWillOpen={() => console.log('Abriendo')}
                    onSwipeableOpen={() => console.log('Abierto')}>
                    <Button
                      style={style.cardButtonContainer}
                      onPress={() => {
                        navigation.navigate('ViewTracking', {
                          name: item.name,
                          description: item.description,
                          code: item.code,
                          date: item.date,
                        });
                      }}>
                      <View style={style.card}>
                        <View style={{marginRight: 10}}>
                          <Text style={style.itemName}>{item.name}</Text>
                          <Text style={style.itemDescription}>
                            {item.description}
                          </Text>
                          <Text style={style.itemDate}>{item.date}</Text>
                          <Button
                            mode="outlined"
                            style={style.copyCodeButton}
                            onPress={() => {
                              Clipboard.setString(item.code);
                              setCopied(true);
                            }}>
                            <Text style={style.itemCode}>{item.code}</Text>
                            <Icon
                              name="content-copy"
                              size={20}
                              color="#378991"
                            />
                          </Button>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                          <AnimatedLottieView
                            source={require('./../assets/lottieFiles/tracking_icon.json')}
                            autoPlay
                            loop={false}
                            style={style.lottieView}
                          />
                        </View>
                      </View>
                    </Button>
                  </Swipeable>
                );
              }}
            />
        </View>
        <CustomModalMemo
          visible={visible}
          setVisible={setVisible}
          setName={setName}
          setDescription={setDescription}
          error={error}
          setCode={setCode}
          onSaveTracking={onSaveTraking}
        />
        <Snackbar
          visible={copied}
          duration={2000}
          style={style.snackbar}
          onDismiss={() => setCopied(false)}>
          <Text style={{textAlign: 'center'}}>
            Código copiado al portapapeles
          </Text>
        </Snackbar>
      </View>
    );
  } else {
    return (
      <View style={{...style.container2, paddingTop: top}}>
        <StatusBar translucent barStyle={'light-content'} />
        <Appbar>
          <Appbar.Content
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
            title="Correos SV"
            titleStyle={{fontWeight: 'bold'}}
          />
          <Appbar.Action
            accessibilityLabelledBy={undefined}
            accessibilityLanguage={undefined}
            icon="archive-plus"
            color="#378991"
            onPress={() => {
              setVisible(true);
            }}
          />
        </Appbar>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'white'}}>Sin códigos de tracking aún</Text>
          <AnimatedLottieView
            source={require('./../assets/lottieFiles/empty_box.json')}
            autoPlay
            loop
            style={style.lottieViewEmpty}
          />
        </View>
        <CustomModalMemo
          visible={visible}
          setVisible={setVisible}
          setName={setName}
          setDescription={setDescription}
          error={error}
          setCode={setCode}
          onSaveTracking={onSaveTraking}
        />
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#46AFB9',
  },
  container2: {
    flex: 1,
    backgroundColor: '#46AFB9',
  },
  textTitleContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1e494e',
  },
  secondaryContainer: {
    backgroundColor: '#46AFB9',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  cardButtonContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemDate: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  copyCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemCode: {
    fontWeight: 'bold',
    marginVertical: 15,
    marginBottom: 10,
  },
  lottieView: {
    width: 50,
    height: 50,
  },
  snackbar: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderColor: '#378991',
    borderWidth: 2,
    borderRadius: 10,
  },
  lottieViewEmpty: {
    width: 200,
    height: 200,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 60,
    borderRadius: 10,
  }, 
  deleteButtonContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'red',
    marginVertical: 60,
    marginRight: 30,
    borderRadius: 10,
  }
});

export default Home;
