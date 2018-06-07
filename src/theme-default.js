import {createMuiTheme} from 'material-ui/styles';

const themeDefault = createMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: 'green'
  },
  drawer: {
    width: 230,
    color: 'grey'
  },
  raisedButton: {
    primaryColor: 'red',
  }
});


export default themeDefault;