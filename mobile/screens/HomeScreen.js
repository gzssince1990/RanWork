import React, { useState, useMemo } from 'react'
import { Content, DatePicker, Text, View, Button } from 'native-base'
import moment from 'moment'

const PLACE_HOLDER = "Select Date"
const RICE_PER_HOUR = 9

export default HomeScreen = () => {
  const [ chosenDate, setChosenDate ] = useState(moment())
  const [ startTime, setStartTime ] = useState(null)
  const [ endTime, setEndTime ] = useState(null)
  const [ revenue, setRevenue ] = useState(null)

  const today = useMemo(() => moment(), [])
  const timeDiff = useMemo(() => (startTime && endTime) && moment.duration(endTime.diff(startTime)), [startTime, endTime])
  const hourDiff = useMemo(() => timeDiff && timeDiff.get('hours'), [timeDiff])
  const minuteDiff = useMemo(() => timeDiff && timeDiff.get('minutes'), [timeDiff])
  const totalHours = useMemo(() => timeDiff && `${hourDiff} h and ${minuteDiff} m`, [timeDiff, hourDiff, minuteDiff])
  const predictedRice = useMemo(() => timeDiff && (hourDiff + minuteDiff / 60) * RICE_PER_HOUR || 0, [timeDiff, hourDiff, minuteDiff])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>

      <DatePicker
        defaultDate={today.toDate()}
        formatChosenDate={ date => moment(date).format('ll') }
        placeHolderText={today.format('ll')}
        textStyle={{ color: "pink", fontSize: 20 }}
        placeHolderTextStyle={{ color: "pink", fontSize: 20 }}
        onDateChange={setChosenDate}
      />
      {
        startTime ? (
          <Text>
            { `Started at ${startTime.format('LTS')}` }
          </Text>
        ) : (
          <Button
            small
            warning
            onPress={() => setStartTime(moment())}
          >
            <Text>Start</Text>
          </Button>
        )
      }
      {
        endTime ? (
          <>
            <Text>
              { `Ended at ${endTime.format('LTS')}` }
            </Text>
            <Text>
              { `Total hours: ${totalHours}` }
            </Text>
            <Text>
              { `Predicted revenue: ${predictedRice.toFixed(2)}` }
            </Text>
          </>
        ) : startTime && (
          <Button
            small
            success
            onPress={() => setEndTime(moment())}
          >
            <Text>End</Text>
          </Button>
        )
      }
    </View>
  )
}
