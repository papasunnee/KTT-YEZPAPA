import {Card, CardBody, CardTitle, Row, Col, CardGroup, Button} from 'reactstrap';
import Widget01 from '../../Widgets/Widget01';
import Widget04 from '../../Widgets/Widget04';

export default props => (
  <CardGroup className="mb-4">
    <Card className="border-danger text-center">
      <CardBody>
        <p className="display-4 text-danger">Add Your Details</p>
        <Button className="btn-lg" outline color="danger"><i className="icon-pencil"></i>&nbsp; Edit</Button>
      </CardBody>
    </Card>
    <Widget04 icon="icon-user" color="danger" header="5% Complete" value="5" invert>Your Profile</Widget04>
  </CardGroup>
)
