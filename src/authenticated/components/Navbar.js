import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import CircularProgress from '@material-ui/core/CircularProgress';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { searchAll } from '../../utils/apiCalls';
// import logo from '../../assets/black.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 10
  },
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none', 
    color: 'white',
  },
  logo: {
    height: '30px', 
    width: '30px',
  },
  logoButton: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(0),
    backgroundColor: 'transparent !important',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const MenuList = (props) => {

  return (
    <div
      className={props.classes.list}
      role="presentation"
      onClick={props.toggleDrawer('left', false)}
      onKeyDown={props.toggleDrawer('left', false)}
    >
      <List>
        {/* {['Trending', 'Discover', 'Most watched', 'Highest rated'].map((text, index) => ( */}
          <ListItem button>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemIcon><TrendingUpIcon /></ListItemIcon>
            <ListItemText primary={'Trending'}></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary={'Discover'}></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><StarIcon /></ListItemIcon>
            <ListItemText primary={'Most watched'}></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary={'Highest rated'}></ListItemText>
          </ListItem>
        {/* ))} */}
      </List>
    </div>
  );
}

const Navbar = (props) => {

  const classes = useStyles();
  const [state, setState] = useState({ left: false });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    searchAll(search)
      .then(result => {
        console.log(result);
        setLoading(false);
        props.history.push('/movies/', result.data);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            {/* <IconButton className={classes.logoButton}>
              <Link to='/'><img src={logo} className={classes.logo} alt="" /></Link>
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to='/' >Home</Link>
            </Typography>
            {/* we can add this later to query for specifically moves, actors, or all
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            <div className={classes.search}>
              {loading
              ?
              <div className={classes.searchIcon}>
                <CircularProgress size={20} />
              </div>
              :
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              }
              <form onSubmit={handleSubmit}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  name="search"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </form>
            </div>
            <div className={classes.grow} />
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}><Link to='/choose-avatar/' className={classes.link} style={{ color: 'black' }}>Change avatar</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to='/change-password/' className={classes.link} style={{ color: 'black' }}>Change password</Link></MenuItem>
                <MenuItem onClick={() => { handleClose(); props.handleLogout(); }}>Logout</MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
        <MenuList classes={classes} toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}

export default Navbar;