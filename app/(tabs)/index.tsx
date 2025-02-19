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
    <View>
      <Text>{time/100}</Text>
      <View>
        <Button onPress={()=>setRun(!run)} title={run ? 'Pause' : 'Start'}></Button>
      </View>
      <View>
        <Button onPress={()=>{setRun(false); setTime(0)}} title='reset'></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
