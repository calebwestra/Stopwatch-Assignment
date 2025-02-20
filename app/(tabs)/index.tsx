import { StyleSheet, View, Button, Text } from 'react-native';
import { useState, useEffect} from 'react';

export default function stopWatch() {
  const [time, setTime] = useState(0)
  const [run, setRun] = useState(false)
  useEffect(()=>{
    if(!run) return
    const id = setInterval(()=>setTime(time=>time+1),10)
    return () => clearInterval(id)
  }, [run])

  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{(time/100).toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button onPress={()=>setRun(!run)} title={run ? 'Pause' : 'Start'}></Button>
        </View>
        <View style={styles.buttons}>
          <Button onPress={()=>{setRun(false); setTime(0)}} title='reset'></Button>
        </View>
        <View style={styles.buttons}>
          <Button title='Lap'></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 150
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontSize: 40
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },
  buttons : {
    margin: 5
  }
});
