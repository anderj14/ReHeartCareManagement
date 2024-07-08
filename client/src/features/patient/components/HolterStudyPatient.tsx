import formatDateTime from '../../../app/components/formatDateTime';
import { HolterStudy } from '../../../app/Models/holterStudy'
import { Box, Card, CardContent } from '@mui/material';

interface Props {
  holterStudy: HolterStudy[]
}

export default function HolterStudyPatient({ holterStudy }: Props) {

  const latestHolterStudy = holterStudy?.slice(-1)[0];

  return (
    <div>
      <Card className="detailsContainer">
        <CardContent className='contentsContainer'>
          <h2>Last Holter Study</h2>
          <div className="holterStudyDetails">
            {latestHolterStudy && (
              <div key={latestHolterStudy.id} className='holterStudy'>
                <section>
                  <Box className="details">
                    <strong>Date: </strong>
                    <span>{formatDateTime(latestHolterStudy.date)}</span>
                  </Box>
                  <Box className="details">
                    <strong>Time: </strong>
                    <span>{latestHolterStudy.time}</span>
                  </Box>
                  <Box className="details">
                    <strong>Study Duration: </strong>
                    <span>{latestHolterStudy.studyDuration}</span>
                  </Box>
                  <Box className="details">
                    <strong>Average Heart Rate: </strong>
                    <span>{latestHolterStudy.averageHeartRate} BPM</span>
                  </Box>
                  <Box className="details">
                    <strong>Maximum Heart Rate: </strong>
                    <span>{latestHolterStudy.maximumHeartRate} BPM</span>
                  </Box>
                </section>
                <section>
                  <Box className="details">
                    <strong>Type of Heart Rhythm: </strong>
                    <span>{latestHolterStudy.typeHeartRhythm}</span>
                  </Box>
                  <Box className="details">
                    <strong>Physical Activity: </strong>
                    <span>{latestHolterStudy.physicalActivity}</span>
                  </Box>
                  <Box className="details">
                    <strong>Conclusion: </strong>
                    <span>{latestHolterStudy.conclusion}</span>
                  </Box>
                </section>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
