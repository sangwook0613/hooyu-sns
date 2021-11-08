import React, {useRef, useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions, TextInput, Image } from 'react-native';
import Status from '../components/ContentCreate/Status';
import Emoji from '../components/ContentCreate/Emoji';
import Picture from '../components/ContentCreate/Picture';
import Survey from '../components/ContentCreate/Survey';

const clientWidth = Dimensions.get('screen').width
const menuArray = ['이모지', '프로필 메시지', '사진', '설문']
const menuLocation = [0, 100, 185, 254]

const CreateContent = ({ navigation, route }) => {
  const [selectedMenu, setSelectedMenu] = useState(route.params.menu)
  const menuScroll = useRef()
  const menuComponent = [
    <Emoji navigation={navigation} route={route} />,
    <Status navigation={navigation} route={route} />, 
    <Picture navigation={navigation} route={route} />,
    <Survey navigation={navigation} route={route} />,
  ]

  useEffect(() => {
    menuScroll.current.scrollTo({ x:menuLocation[selectedMenu] })
  })

  return (
    <View style={styles.mainView}>
      <View style={styles.content}>
        {menuComponent[selectedMenu]}
      </View>
      <View style={styles.footer}>
        <View>
          <ScrollView
            horizontal={true}
            ref={menuScroll}
            showsHorizontalScrollIndicator={false}

          >
            <View style={styles.blankBoxStart}></View>
            {
              menuArray.map((menu, index) => (
                <TouchableOpacity 
                key={index}
                onPress={() => {
                  menuScroll.current.scrollTo({ x:menuLocation[index] })
                  setSelectedMenu(index)
                }}
                
                >
                  <Text 
                    style={{
                      marginHorizontal: 20,
                      fontSize: menuArray[selectedMenu] === menu ? 17 : 13,
                      color: menuArray[selectedMenu] === menu ? 'black' : '#aaa',
                      paddingTop: menuArray[selectedMenu] === menu ? -10 : 2
                    }}
                  >
                    {menu}
                  </Text>
                </TouchableOpacity>
              ))
            }
            <View style={styles.blankBoxEnd}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flex: 9,
  },
  footer: {
    height: 60,
    backgroundColor: "#eee",
    justifyContent: 'center',
  },
  checkBox: {
    borderWidth: 2,
  },
  blankBoxStart: {
    width: clientWidth/2-85,
    marginHorizontal: 20,
  },
  blankBoxEnd: {
    width: clientWidth/2-76,
    marginHorizontal: 20,
  },
  selectedMenuText: {
    marginHorizontal: 20,
    fontSize: 16,
    paddingBottom: 2
  },
  notSelectedMenuText: {
    marginHorizontal: 20,
    fontSize: 16,
    paddingBottom: 2
  }
});


export default CreateContent;