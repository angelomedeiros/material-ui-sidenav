import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Menu, ExpandLess, ExpandMore, Bookmarks, Bookmark, Home } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  MenuList,
  MenuItem,
  Collapse,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  docked: {
    height: '100%',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  }
})

class SideNav extends Component {

  state = {
    mobileOpen: false,
    expanded: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes, children, writers, location: { pathname } } = this.props
    const { mobileOpen } = this.state

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <MenuItem component={Link} to='/' selected={ '/' === pathname } >
          <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText inset primary="Home" />
          </MenuItem>
          <MenuItem 
            component={Link} 
            to='/writers' 
            selected={ '/writers' === pathname } 
            onClick={this.handleExpandClick} >
            <ListItemIcon>
              <Bookmarks />
            </ListItemIcon>
            <ListItemText inset primary="Writers" />
            {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            {writers.map(({ id, name }) => {
              return <MenuItem 
                key={id}
                className={classes.nested}
                component={Link}
                to={`/writers/${id}`} selected={ `/writers/${id}` === pathname } >
                <ListItemIcon>
                  <Bookmark />
                </ListItemIcon>
                <ListItemText inset  secondary={name} />                
              </MenuItem>
            })}
          </Collapse>
        </MenuList>
      </div>
    )

    return <Fragment>
      <div className={classes.root}>
        <AppBar position='absolute' className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Writers Blog
          </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
              docked: classes.docked
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(SideNav)