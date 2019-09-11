import React from 'react'
import gql from 'graphql-tag'
import { Text, View } from 'native-base'
import { useQuery } from '@apollo/react-hooks'

const ATTENDANCE_QUERY = gql`
  query attendanceList {
    attendances {
      id
      workDate
      startTime
      endTime
    }
  }
`

export default ReportScreen = () => {
  const { data, loading, error } = useQuery(ATTENDANCE_QUERY, { fetchPolicy: "network-only" })

  if (loading) return <Text>Loading</Text>
  if (error) return <Text>ERROR</Text>
  if (!data) return <Text>Empty</Text>

  const { attendances } = data

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Reports!</Text>
      {
        attendances.map(({ id }) => <Text key={id}>
          { `id: ${id}` }
        </Text>)
      }
    </View>
  )
}
