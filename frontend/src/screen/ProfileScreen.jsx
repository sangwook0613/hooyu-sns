import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
  const ProfileTitle = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{ width: 50, height: 50 }}
          source={route.params.emoji}
        />
        <Text>{route.params.nickname}</Text>
      </View>
    );
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <ProfileTitle {...props} />,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Setting')}>
          <Text>설정</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  )
}

export default ProfileScreen;