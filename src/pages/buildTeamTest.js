import React from 'react';
import smallLogo from '../DreamTeamLogo_small.PNG'
import { GlobalStyles } from '../global';
import logo from '../DreamTeamLogo.PNG';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox'
import { FixedSizeList } from 'react-window';
import GaugeChart from 'react-gauge-chart';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'auto',
  },
   paper: {
    width: 200,
    height: 'auto',
    overflow: 'auto',
    color:'black',
  },
  checkBox: {
    color: '#ffde59',
    '&$checked': {
      color: '#ffde59',
    },
  },
  checked: {},
  button: {
    margin: theme.spacing(0.5, 0),

    
    
  },

}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

 function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List className= "team_list" dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (

            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox className={classes.checkBox}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  color='yellow'
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="stretch" className={classes.root}>
      
      <Grid item className="leftList">
        <h1> Athletes</h1>
      {customList(right)}
        
      </Grid>
     
      <Grid item>
        <Grid container direction="column" alignItems="stretch">
        <Button
            variant="outlined"
            size="small"
            className="addPlayer"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            Add
          </Button>
         
          <Button
            variant="outlined"
            size="small"
            className="removePlayer"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Remove
          </Button>

           <Button
            variant="outlined"
            size="small"
            className="clrList"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            Clear Team List
          </Button>
          
         
        </Grid>
      </Grid>
      <Grid item className="rightList"> 
      <h1> Team</h1>
      {customList(left)}</Grid>
    </Grid>
  );
}


export const buildTeamTest = () => {
    return (
       <div>
       <img src={smallLogo} className="icon" alt="small_logo" />
       <img className="bg_lower_test" alt="logo" /> 
       <TransferList/>   



           

    <div class="topnav">
         <a href="/Notifications" >
            Notifications
           </a>
      <a href="/MyTeams" >
            Teams
           </a>
           <a href="/CreateATryout" >
            Create A Tryout
           </a>
           <a href="/Profile" >
            Profile
           </a>

          </div>


       </div>
    );
}
 
export default buildTeamTest;