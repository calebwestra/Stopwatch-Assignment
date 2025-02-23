import { StyleSheet, View, Button, Text } from 'react-native';
import { useState, useEffect} from 'react';


export default function StopWatch() {
  // even though it says milisecs, its really 10 miliseconds
  const [milisecs, setSecs] = useState(0)
  const [mins, setMins] = useState(0)
  const [run, setRun] = useState(false)
                                  // errors occur without this specific declaration
  const [laps, setLap] = useState<JSX.Element[]>([])

  // Given current time, creates renders a lap component to the webpage.
  const addLap = (mins : number, milisecs : number )=>{
    // Max Laps: 5
    if(laps.length >= 5) return
    // A lap's ID is it's its time in Minutes + Miliseconds.
    // This will be used for individual removal.
    const id = `${mins+milisecs}`
    // JSX Lap Component
    const lap = (
    <View style={{display: 'flex', flexDirection: 'row', margin: 7}} key={id}>
      <View style={styles.buttons}>
        <Button title='-' onPress={()=>{
          // If two laps have the same time, they will both be removed.
          removeLap(id)
        }}></Button>
      </View>
      <Text style={styles.text}>{String(mins).padStart(2, '0') + ':' + 
        String(Math.floor(milisecs/100)).padStart(2,'0') + '.' +
        String(milisecs % 100).padStart(2, '0')}
      </Text>`
    </View>)
    // Adds the above lap to our array  of laps.
    setLap([...laps, lap])
  }

  // When we call the remove lap function, we give it an ID.
  // This function filters out the lap/s in the lap array corresponding to the ID.
  const removeLap = (id: string)=>{setLap(laps=>laps.filter((l)=>l.key != id))
  }

  // Updates the timer
  useEffect(() => {
    if (!run) return;
    const id = setInterval(()=>{
      setSecs(milisecs=>{
        if (milisecs >= 6000) { // we have reached a minute
          setMins(mins=>mins+1) // increment minutes
          return 0 // resets MS to 0
        } 
          return milisecs + 1
        })
      }, 10)
    return () => clearInterval(id);
  }, [run]);

  let circleBackgroundColor = run ? 'lawngreen' : 'yellow';

  // JSX rendered to Webpage
  return (
    <View style={styles.page}>
      <View style={styles.timerContainer}>
        {/* <View style={styles.textContainer}> */}
        <View style={[styles.textContainer, { backgroundColor: circleBackgroundColor }]}>
          <Text style={styles.title}>{String(mins).padStart(2, '0') + ':' +  // formatting = MI:SE.MS
                        String(Math.floor(milisecs/100)).padStart(2, '0') + '.' +
                        String((milisecs % 100)).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Button onPress={()=>setRun(!run)} title={run ? 'Pause' : 'Start'}></Button>
          </View>
          <View style={styles.buttons}>
            <Button onPress={()=>{setRun(false); setSecs(0); setMins(0)}} title='reset'></Button>
          </View>
        </View>
      </View>
      <View style={styles.lapContainer}>
        <View style={styles.laps}>{laps}</View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Button title='Lap' onPress={()=>{
              addLap(mins, milisecs)
            }}></Button>
          </View>
          <View style={styles.buttons}>
            <Button title='Clear Laps' onPress={()=>setLap([])}></Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lapContainer: {
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  laps:{
    height: 300,
    padding: 0,
    width: 200,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerContainer: {
    margin: 50,
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
  title: {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontSize: 40
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'monospace',
    fontSize: 20
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },
  buttons : {
    margin: 5
  },
});
