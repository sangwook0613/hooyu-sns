import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import Main from '../screen/Main';
import ProfileScreen from '../screen/ProfileScreen';
import SettingScreen from '../screen/SettingScreen';
import CreateContent from '../screen/CreateContent';


const Nav = createNativeStackNavigator()

const Root = () => {
  const navigation = useNavigation();

  return (
    <Nav.Navigator
      // initialRouteName="Main"
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >

      {/* 로그인 화면 */}
      {/* <Nav.Screen name="Loading" component={Loading} /> */}
      {/* <Nav.Screen name="NicknameTutorial" component={NicknameTutorial} />
      <Nav.Screen name="StatusTutorial" component={StatusTutorial} />
      <Nav.Screen name="EmojiTutorial" component={EmojiTutorial} /> */}

      <Nav.Screen name="Main" component={Main} />
      <Nav.Screen name="Profile" component={ProfileScreen}
        options={{
          headerShown: true,
        }}/>
      <Nav.Screen name="Setting" component={SettingScreen} options={{
        headerShown: true,
        headerTitle: "설정",
      }} />

      {/* 세부 설정 */}
      {/* <Nav.Screen name="UserSetting" component={SettingScreen} options={{
        headerShown: true,
        headerTitle: "계정 설정",
      }} />
      <Nav.Screen name="PrivateZoneSetting" component={SettingScreen} options={{
        headerShown: true,
        headerTitle: "프라이빗 존",
      }} />
      <Nav.Screen name="PushSetting" component={SettingScreen} options={{
        headerShown: true,
        headerTitle: "푸시 알림",
      }} /> */}
      
      {/* 컨텐츠 생성 */}
      <Nav.Screen name="CreateContent" component={CreateContent} options={{ headerShown: true }} />
      {/* <Nav.Screen name="CreateStatus" component={Status} options={{ headerShown: true }} /> */}
      {/* <Nav.Screen name="CreateImage" component={CreateImageScreen} options={{ headerShown: true }} /> */}
      {/* <Nav.Screen name="CreateEmoji" component={CreateEmojiScreen} options={{ headerShown: true }} /> */}
      {/* <Nav.Screen name="CreateSurvey" component={CreateSurveyScreen} options={{ headerShown: true }} /> */}
    </Nav.Navigator>
  )
}

export default Root;