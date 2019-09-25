// jest configuration is looking for this file
// create react app has a script that interacts with this
// it will run this before every test
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new EnzymeAdapter() });
