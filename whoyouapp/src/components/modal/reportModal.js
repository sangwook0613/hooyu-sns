import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import Checkbox from 'expo-checkbox';
import { connect } from 'react-redux'

const ReportModal = ({ isModalVisible, setModalVisible, deviceHeight, deviceWidth }) => {
  const [isCheckedOne, setCheckedOne] = useState(false)
  const [isCheckedTwo, setCheckedTwo] = useState(false)
  const [isCheckedThree, setCheckedThree] = useState(false)
  const reportItems = [
    {
      id: 1,
      title: '광고성 게시물',
      isChecked: isCheckedOne,
      setChecked: setCheckedOne,
    },
    {
      id: 2,
      title: '유해 게시물',
      isChecked: isCheckedTwo,
      setChecked: setCheckedTwo,
    },
    {
      id: 3,
      title: '성적 게시물',
      isChecked: isCheckedThree,
      setChecked: setCheckedThree,
    }
  ]

  const sendModalVisible = () => {
    setModalVisible(!isModalVisible)
  }

  const sendReport = () => {
    console.warn('Send Report')
    sendModalVisible()
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={sendModalVisible}
      useNativeDriver={true}
      style={{
        flex: 1, justifyContent: "center", alignItems: "center",
      }}
    >
      <View style={{
        padding: 20,
        backgroundColor: 'white',
        width: 320,
        height: 280,
      }}>
        <Text style={{
          fontSize: deviceWidth * 0.053,
          // fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 20
        }}>신고하기</Text>
        <Text style={{
          fontSize: deviceWidth * 0.035,
          // fontSize: 14,
          marginBottom: 20
        }}>신고 사유를 선택하주세요.</Text>
        {reportItems.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <Checkbox
              value={item.isChecked}
              onValueChange={item.setChecked}
              style={{
                marginRight: 16,
              }}
            />
            <Text style={{
              fontSize: deviceWidth * 0.038,
              // fontSize: 16,
              fontWeight: '700'
            }}>{item.title}</Text>
          </View>
        ))}
        <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          <TouchableOpacity style={{ paddingRight: 30 }} onPress={sendModalVisible}>
            <Text style={{
              fontSize: deviceWidth * 0.038,
              // fontSize: 16
            }}>아니오</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingRight: 20 }} onPress={sendReport}>
            <Text style={{
              fontSize: deviceWidth * 0.038,
              // fontSize: 16,
              color: 'red'
            }}>네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

};


function mapStateToProps(state) {
  return {
    deviceWidth: state.user.deviceWidth,
    deviceHeight: state.user.deviceHeight,
  }
}

export default connect(mapStateToProps)(ReportModal)
