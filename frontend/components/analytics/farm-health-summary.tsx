import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FarmHealthSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Health Summary</CardTitle>
        <CardDescription>Plain English interpretation of your farm's current status</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="soil">Soil</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="pt-4 space-y-4">
            <p className="text-sm">
              Your farm is generally in good condition, with an overall health score of 85%. The North Field is
              performing exceptionally well, while the East Field is showing signs of nutrient deficiency that should be
              addressed soon. The South Field has potential for yield improvement with proper nitrogen management.
            </p>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Key Strengths</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li>• North Field corn is thriving with excellent soil conditions and nutrient balance</li>
                <li>• Drone monitoring has successfully identified early signs of issues before visible damage</li>
                <li>• Weather conditions are favorable for continued growth in the coming weeks</li>
              </ul>
            </div>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Areas for Improvement</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li>• East Field soybeans need potassium supplementation to reach full potential</li>
                <li>• South Field wheat requires nitrogen application to improve yield forecast</li>
                <li>• North Field section A3 needs immediate irrigation to prevent moisture stress</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="crops" className="pt-4 space-y-4">
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Corn (North Field)</h3>
              <p className="mt-2 text-sm">
                Your corn crop is in excellent health (NDVI: 0.92), showing dark green leaves and strong stalk
                development. Drone imagery shows consistent growth across most of the field, with only section A3
                showing early signs of moisture stress. Current projections indicate a yield of 168 bu/acre, which is
                12% above last season.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Soybeans (East Field)</h3>
              <p className="mt-2 text-sm">
                Your soybean crop is in fair condition (NDVI: 0.68), with some yellowing at leaf edges indicating
                potassium deficiency. Drone multispectral imagery confirms this pattern across 60% of the field.
                Addressing the potassium deficiency could improve the current yield projection of 42 bu/acre, which is
                currently 3% below last season.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Wheat (South Field)</h3>
              <p className="mt-2 text-sm">
                Your wheat crop is in good condition (NDVI: 0.75), but showing lighter green coloration indicating
                nitrogen limitation. Drone imagery shows this is most pronounced in the western portion of the field.
                Current yield projection is 58 bu/acre, which is 8% above last season, but could be further improved
                with nitrogen application.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="soil" className="pt-4 space-y-4">
            <p className="text-sm">
              Soil sensor data combined with drone imagery provides a comprehensive view of your soil health. The main
              issues identified are low moisture in North Field section A3, potassium deficiency in East Field, and
              nitrogen deficiency in South Field.
            </p>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Soil Moisture Status</h3>
              <p className="mt-2 text-sm">
                North Field is generally well-watered (28% moisture) except for section A3 which has dropped to 14%
                moisture, well below the optimal range of 25-30%. East Field (22%) and West Field (18%) have adequate
                moisture, while South Field (14%) is approaching the lower limit of acceptable moisture.
              </p>
            </div>
            <div className="rounded-md border p-3">
              <h3 className="text-sm font-medium">Nutrient Status</h3>
              <p className="mt-2 text-sm">
                Nitrogen levels are adequate in North Field (65%), low in East Field (40%), and very low in South Field
                (30%). Phosphorus levels are high in East Field (75%) and adequate elsewhere. Potassium is critically
                low in East Field (35%), which explains the yellowing leaf edges visible in drone imagery.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="pt-4 space-y-4">
            <p className="text-sm">
              Based on the combined drone and sensor data, here are the key actions needed on your farm, in order of
              priority:
            </p>
            <ol className="mt-2 text-sm space-y-3">
              <li className="rounded-md border p-3">
                <span className="font-medium">1. Irrigate North Field Section A3</span>
                <p className="mt-1">
                  Apply 1.5 inches of water within the next 24 hours to prevent yield loss from moisture stress.
                </p>
              </li>
              <li className="rounded-md border p-3">
                <span className="font-medium">2. Apply Nitrogen to South Field</span>
                <p className="mt-1">
                  Apply nitrogen-rich fertilizer at 75 lbs/acre within the next 3 days to improve wheat growth and yield
                  potential.
                </p>
              </li>
              <li className="rounded-md border p-3">
                <span className="font-medium">3. Apply Potassium to East Field</span>
                <p className="mt-1">
                  Apply potassium-rich fertilizer at 50 lbs/acre within the next 7 days to correct deficiency in
                  soybeans.
                </p>
              </li>
              <li className="rounded-md border p-3">
                <span className="font-medium">4. Monitor Weather Forecast</span>
                <p className="mt-1">
                  Heavy rainfall (1.5-2.0 inches) is expected in the next 48 hours. Postpone any fertilizer application
                  until after the rainfall to prevent runoff.
                </p>
              </li>
            </ol>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

