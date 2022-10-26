import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

// app export
export default function App() {

  // set and make funtions
  const IconDelete = "delete";

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const hadnleDelete = (task) => {
    let tasksCopy = [...tasks];
    console.log(task);
    tasksCopy.splice(task.index, 1)
    setTasks(tasksCopy);
    console.log('deleted');
  };

  const handleSubmit = (value) => {
    Keyboard.dismiss();
    console.log('submit');
    setTask(value.nativeEvent.text);
    setTasks([...tasks, task]);
    setTask('');
    console.log(tasks);
  };

  // app.js component
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SafeAreaView}>
        <Text style={styles.SafeText}>
          Today's todos
        </Text>
      </SafeAreaView>


      {/* Todos area */}
      <ScrollView>
        {
          tasks.map((task, index) => {
            return (
              <TouchableOpacity
                key={index}
              >
                <View style={Taskstyles.TaskView}>
                  <Text
                    style={[
                      Taskstyles.TaskItems,
                      { flex: 1 }
                    ]}
                  >
                    {task}
                  </Text>
                  <Pressable
                    onPress={(task) => hadnleDelete(task)}
                  >
                    <MaterialCommunityIcons
                      name={IconDelete}
                      style={[
                        Taskstyles.TaskItems,
                        {
                          alignSelf: "flex-end",
                          paddingLeft: 0,
                          paddingRight: 20,
                          fontSize: 20,
                          color: 'red',
                        }
                      ]}>
                    </MaterialCommunityIcons>
                  </Pressable>
                </View >
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>


      {/* input area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.Input}
      >
        <TextInput
          placeholder='input here'
          style={styles.Form}
          onSubmitEditing={(value) => handleSubmit(value)}
          onChangeText={setTask}
          value={task}
        />
      </KeyboardAvoidingView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '98%',
    width: '100%',
  },
  SafeAreaView: {
    marginBottom: 20,
  },
  SafeText: {
    textAlign: 'left',
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  Input: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  Form: {
    padding: 20,
    fontSize: 17,
  },
});

const Taskstyles = StyleSheet.create({
  TaskView: {
    margin: 10,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    flexDirection: 'row',
  },
  TaskItems: {
    fontSize: 17,
    paddingLeft: 20,
  }
})