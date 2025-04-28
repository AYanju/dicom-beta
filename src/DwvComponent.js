import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';

import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Grid from '@mui/material/Grid';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import ContrastIcon from '@mui/icons-material/Contrast';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StraightenIcon from '@mui/icons-material/Straighten';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'; // New icon for multi-file navigation


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';

import TagsTable from './TagsTable';

import './DwvComponent.css';
import {
  App,
  getDwvVersion,
  decoderScripts
} from 'dwv';

// Image decoders (for web workers)
decoderScripts.jpeg2000 = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpeg2000.js`;
decoderScripts["jpeg-lossless"] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`;
decoderScripts["jpeg-baseline"] = `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`;
decoderScripts.rle = `${process.env.PUBLIC_URL}/assets/dwv/decoders/dwv/decode-rle.js`;

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    flex: '0 0 auto',
  },
  iconSmall: {
    fontSize: 20,
  },
  infoPanel: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  infoHeader: {
    fontWeight: 'bold',
  },
  infoContent: {
    marginTop: theme.spacing(1),
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
    width: '100%',
    maxWidth: '500px',
  },
  sliderLabel: {
    minWidth: '50px',
  },
  slider: {
    flex: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  sliderValue: {
    minWidth: '60px',
    textAlign: 'right',
  },
  navigationControls: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1),
  },
  seriesNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  seriesNavigationText: {
    margin: theme.spacing(0, 2),
  },
  seriesChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  fileInfoContainer: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  // New style for file navigation controls
  fileNavigation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },

   // Enhanced file navigation styles
   fileInfoContainer: {
    padding: '8px 16px',
    margin: '8px 0',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  fileNavigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  seriesNavigationText: {
    margin: '0 10px'
  },
  navigationIndicator: {
    display: 'flex',
    marginTop: '5px',
  },
  indicatorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    margin: '0 3px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    '&.active': {
      backgroundColor: theme.palette.primary.main
    }
  },
  
  // Thumbnail panel styles
  thumbnailPanel: {
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9'
  },
  thumbnailContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    position: 'relative',
    backgroundColor: 'white',
    '&.active': {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 5px ${theme.palette.primary.light}`
    }
  },
  
  // Dropbox styles
  dropBox: {
    width: '80%',
    margin: '20px auto',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  },
  dropBoxBorder: {
    border: '3px dashed #ccc',
    '&:hover': {
      borderColor: '#aaa'
    }
  },
  hover: {
    backgroundColor: '#e3f2fd !important',
    borderColor: '#1976d2 !important'
  },
  
  // Keyboard shortcuts helper styles
  keyboardHelp: {
    margin: '10px auto',
    maxWidth: '400px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    '& kbd': {
      backgroundColor: '#f1f1f1',
      border: '1px solid #ccc',
      borderRadius: '3px',
      padding: '2px 5px',
      fontFamily: 'monospace'
    }
  },

  
});

export const TransitionUp = React.forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

class DwvComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      versions: {
        dwv: getDwvVersion(),
        react: React.version
      },
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ['Ruler']
        }
      },
      selectedTool: 'Select Tool',
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      metaData: {},
      orientation: undefined,
      showDicomTags: false,
      showInfoPanel: false,
      basicInfo: {
        patientName: '',
        patientId: '',
        studyDate: '',
        modality: '',
        seriesDescription: ''
      },
      dropboxDivId: 'dropBox',
      dropboxClassName: 'dropBox',
      borderClassName: 'dropBoxBorder',
      hoverClassName: 'hover',
      currentImageIndex: 0,
      totalImages: 0,
      loadedFiles: [], // Track loaded file names
      loadedDataIds: [], // Track data IDs for direct access
      seriesInstanceUIDs: [], // Track different series
      currentSeriesIndex: 0, // Current series being viewed
      showNavigation: false, // Whether to show navigation controls
      seriesInfo: [], // Array of information about each series
      focusedDataId: null, // Currently focused data ID
      currentFileIndex: 0, // Track current file index for multi-file navigation
      showFileNavigation: false, // Show file navigation controls
      showKeyboardHelp: false,
    };
  }


  render() {
    const { classes } = this.props;
    const {
      versions,
      tools,
      loadProgress,
      dataLoaded,
      metaData,
      showInfoPanel,
      basicInfo,
      currentImageIndex,
      totalImages,
      loadedFiles,
      showNavigation,
      seriesInstanceUIDs,
      currentSeriesIndex,
      seriesInfo,
      currentFileIndex,
      showFileNavigation,
      loadedDataIds,
      focusedDataId,
      showKeyboardHelp
    } = this.state;
  
    const handleToolChange = (event, newTool) => {
      if (newTool) {
        this.onChangeTool(newTool);
      }
    };
   
    const toolsButtons = Object.keys(tools).map((tool) => {
      return (
        <Tooltip title={tool} key={tool}>
          <ToggleButton value={tool}
            disabled={!dataLoaded || !this.canRunTool(tool)}>
            {this.getToolIcon(tool)}
          </ToggleButton>
        </Tooltip>
      );
    });
  
    // Render thumbnail panel
    const renderThumbnailPanel = () => {
      if (!loadedDataIds || loadedDataIds.length <= 1 || !this.state.dwvApp) {
        return null;
      }
      
      return (
        <Box className={classes.thumbnailPanel}>
          <Typography variant="subtitle1" gutterBottom>
            Loaded Files ({loadedDataIds.length})
          </Typography>
          <Box className={classes.thumbnailContainer}>
            {loadedDataIds.map((dataId, index) => {
              const isActive = dataId === focusedDataId;
              let description = `Image ${index + 1}`;
              
              try {
                if (this.state.dwvApp) {
                  const metadata = this.state.dwvApp.getMetaData(dataId);
                  const seriesDesc = this.extractTagValue(metadata, '0008103E');
                  if (seriesDesc) description = seriesDesc;
                }
              } catch (e) {
                console.warn("Error getting metadata for thumbnail", e);
              }
              
              return (
                <Box 
                  key={dataId}
                  className={`${classes.thumbnail} ${isActive ? 'active' : ''}`}
                  sx={{ 
                    border: isActive ? '2px solid #1976d2' : '1px solid #ccc',
                    backgroundColor: isActive ? '#e3f2fd' : 'transparent'
                  }}
                  onClick={() => this.switchToFile(index)}
                >
                  <div className="thumbnail-number">{index + 1}</div>
                  <Typography variant="caption" noWrap>
                    {description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };
  
    // Keyboard shortcuts helper component
    const KeyboardShortcutsHelper = () => {
      if (!showKeyboardHelp) return null;
      
      return (
        <Box className={classes.keyboardHelp}>
          <Typography variant="subtitle2" gutterBottom>
            Keyboard Shortcuts
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <kbd>←</kbd> / <kbd>→</kbd>: Previous/Next file
              </Typography>
              <Typography variant="body2">
                <kbd>↑</kbd> / <kbd>↓</kbd>: Previous/Next slice
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <kbd>PageUp</kbd> / <kbd>PageDown</kbd>: Previous/Next slice
              </Typography>
              <Typography variant="body2">
                <kbd>1</kbd>-<kbd>9</kbd>: Jump to file #
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    };
  
    // Enhanced file navigation with dots indicator
    const renderEnhancedFileNavigation = () => {
      if (loadedFiles.length <= 1) {
        return null;
      }
      
      return (
        <Box className={classes.fileNavigation}>
          <IconButton
            onClick={() => this.navigateFile(-1)}
            disabled={currentFileIndex === 0}
            size="small"
          >
            <NavigateBeforeIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" className={classes.seriesNavigationText}>
              File {currentFileIndex + 1} / {loadedFiles.length}
            </Typography>
            
            {/* Add a simple progress indicator */}
            <Box className={classes.navigationIndicator}>
              {loadedFiles.map((_, index) => (
                <Box
                  key={index}
                  className={`${classes.indicatorDot} ${index === currentFileIndex ? 'active' : ''}`}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    mx: 0.5,
                    bgcolor: index === currentFileIndex ? 'primary.main' : 'grey.300',
                    cursor: 'pointer'
                  }}
                  onClick={() => this.switchToFile(index)}
                />
              ))}
            </Box>
          </Box>
          
          <IconButton
            onClick={() => this.navigateFile(1)}
            disabled={currentFileIndex === loadedFiles.length - 1}
            size="small"
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      );
    };
  
    return (
      <div id="dwv">
        <LinearProgress variant="determinate" value={loadProgress} />
       
        {dataLoaded && (
          <Box className={classes.fileInfoContainer}>
            <Typography variant="subtitle1">
              Loaded {loadedFiles.length} file(s)
              {seriesInstanceUIDs.length > 1 && (
                <span> ({seriesInstanceUIDs.length} series)</span>
              )}
            </Typography>
          </Box>
        )}
       
        {/* Enhanced file navigation with visual indicators */}
        {dataLoaded && loadedFiles.length > 1 && showFileNavigation && 
          renderEnhancedFileNavigation()
        }
        
        {/* Thumbnail panel showing all loaded files */}
        {dataLoaded && loadedFiles.length > 1 && showFileNavigation && 
          renderThumbnailPanel()
        }
        
        {/* Keyboard shortcuts helper */}
        {dataLoaded && showKeyboardHelp && <KeyboardShortcutsHelper />}
       
        {dataLoaded && seriesInstanceUIDs.length > 1 && (
          <Box className={classes.seriesChips}>
            {seriesInfo.map((series, index) => (
              <Chip
                key={index}
                label={`Series ${index + 1}: ${series.description || 'No description'}`}
                onClick={() => this.switchToSeries(index)}
                color={index === currentSeriesIndex ? "primary" : "default"}
                variant={index === currentSeriesIndex ? "filled" : "outlined"}
              />
            ))}
          </Box>
        )}
       
        {dataLoaded && seriesInstanceUIDs.length > 1 && (
          <Box className={classes.seriesNavigation}>
            <IconButton
              onClick={() => this.navigateSeries(-1)}
              disabled={currentSeriesIndex === 0}
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="body1" className={classes.seriesNavigationText}>
              Series {currentSeriesIndex + 1} / {seriesInstanceUIDs.length}
            </Typography>
            <IconButton
              onClick={() => this.navigateSeries(1)}
              disabled={currentSeriesIndex === seriesInstanceUIDs.length - 1}
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        )}
       
        {dataLoaded && showInfoPanel && (
          <Paper className={classes.infoPanel}>
            <Typography variant="h6" className={classes.infoHeader}>DICOM Information</Typography>
            <Box className={classes.infoContent}>
              <Typography variant="body1">Patient: {basicInfo.patientName || 'Anonymous'}</Typography>
              <Typography variant="body1">Patient ID: {basicInfo.patientId || 'N/A'}</Typography>
              <Typography variant="body1">Study Date: {basicInfo.studyDate || 'N/A'}</Typography>
              <Typography variant="body1">Modality: {basicInfo.modality || 'N/A'}</Typography>
              <Typography variant="body1">Series: {basicInfo.seriesDescription || 'N/A'}</Typography>
              {totalImages > 1 && (
                <Typography variant="body1">Image: {currentImageIndex + 1} / {totalImages}</Typography>
              )}
              {loadedFiles.length > 1 && (
                <Typography variant="body1">File: {currentFileIndex + 1} / {loadedFiles.length}</Typography>
              )}
            </Box>
          </Paper>
        )}
  
        {dataLoaded && totalImages > 1 && showNavigation && (
          <Box className={classes.sliderContainer}>
            <Typography variant="body2" className={classes.sliderLabel}>
              Slice:
            </Typography>
            <Slider
              className={classes.slider}
              value={currentImageIndex}
              min={0}
              max={totalImages - 1}
              step={1}
              onChange={this.handleSliceChange}
              aria-labelledby="slice-slider"
            />
            <Typography variant="body2" className={classes.sliderValue}>
              {currentImageIndex + 1}/{totalImages}
            </Typography>
          </Box>
        )}
       
        {dataLoaded && totalImages > 1 && showNavigation && (
          <Box className={classes.navigationControls}>
            <IconButton
              onClick={() => this.navigateSlice(-1)}
              disabled={currentImageIndex === 0}
              size="small"
            >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              onClick={() => this.navigateSlice(1)}
              disabled={currentImageIndex === totalImages - 1}
              size="small"
            >
              <SkipNextIcon />
            </IconButton>
          </Box>
        )}
       
        <Stack direction="row" spacing={1} padding={1}
          justifyContent="center" flexWrap="wrap">
          <ToggleButtonGroup size="small"
            color="primary"
            value={this.state.selectedTool}
            exclusive
            onChange={handleToolChange}
          >
            {toolsButtons}
          </ToggleButtonGroup>
  
          <Tooltip title="Reset View">
            <ToggleButton size="small"
              value="reset"
              disabled={!dataLoaded}
              onChange={this.onReset}
            ><RefreshIcon /></ToggleButton>
          </Tooltip>
  
          <Tooltip title="Toggle Orientation">
            <ToggleButton size="small"
              value="toggleOrientation"
              disabled={!dataLoaded}
              onClick={this.toggleOrientation}
            ><CameraswitchIcon /></ToggleButton>
          </Tooltip>
  
          <Tooltip title="Show Basic Info">
            <ToggleButton size="small"
              value="info"
              disabled={!dataLoaded}
              selected={showInfoPanel}
              onClick={() => this.setState({ showInfoPanel: !showInfoPanel })}
            ><InfoOutlinedIcon /></ToggleButton>
          </Tooltip>
  
          {/* File navigation toggle button */}
          <Tooltip title="Toggle File Navigation">
            <ToggleButton size="small"
              value="fileNav"
              disabled={!dataLoaded || loadedFiles.length <= 1}
              selected={showFileNavigation}
              onClick={() => this.setState({ showFileNavigation: !showFileNavigation })}
            ><ViewCarouselIcon /></ToggleButton>
          </Tooltip>
  
          {/* New keyboard shortcuts help button */}
          <Tooltip title="Keyboard Shortcuts">
            <ToggleButton size="small"
              value="keyboardHelp"
              disabled={!dataLoaded}
              selected={showKeyboardHelp}
              onClick={() => this.setState({ showKeyboardHelp: !showKeyboardHelp })}
            ><KeyboardIcon /></ToggleButton>
          </Tooltip>
  
          <Tooltip title="DICOM Tags">
            <ToggleButton size="small"
              value="tags"
              disabled={!dataLoaded}
              onClick={this.handleTagsDialogOpen}
            ><LibraryBooksIcon /></ToggleButton>
          </Tooltip>
  
          <Tooltip title="Close & Open New Image">
            <ToggleButton size="small"
              value="close"
              disabled={!dataLoaded}
              onClick={this.closeImage}
            ><AddPhotoAlternateIcon /></ToggleButton>
          </Tooltip>
  
          <Dialog
            open={this.state.showDicomTags}
            onClose={this.handleTagsDialogClose}
            TransitionComponent={TransitionUp}
            fullWidth
            maxWidth="md"
          >
            <AppBar className={classes.appBar} position="sticky">
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleTagsDialogClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                  DICOM Tags
                </Typography>
              </Toolbar>
            </AppBar>
            <TagsTable data={metaData} />
          </Dialog>
        </Stack>
  
        {/* Enhanced dropbox with message */}
        <div id="layerGroup0" className="layerGroup">
          <div id="dropBox" className={`${classes.dropBox} ${classes.dropBoxBorder}`}></div>
        </div>
  
        <div><p className="legend">
          <Typography variant="caption">Beta by <Link
            href="https://github.com/ivmartel/dwv"
            title="dwv on github"
            color="inherit">Yanju
          </Link> 0.1 and <Link
            href="https://github.com/facebook/react"
            title="react on github"
            color="inherit">React
          </Link> {versions.react}
          </Typography>
        </p></div>
  
      </div>
    );
  }

  /**
   * Handle slider change for image navigation
   */
  handleSliceChange = (event, newValue) => {
    if (this.state.dwvApp) {
      this.state.dwvApp.setCurrentPosition({k: newValue});
    }
   
    this.setState({
      currentImageIndex: newValue
    });
  }

  /**
   * Navigate through slices
   */
  navigateSlice = (direction) => {
    if (this.state.dwvApp) {
      const newIndex = this.state.currentImageIndex + direction;
      if (newIndex >= 0 && newIndex < this.state.totalImages) {
        this.state.dwvApp.setCurrentPosition({k: newIndex});
        this.setState({
          currentImageIndex: newIndex
        });
      }
    }
  }

  /**
   * Navigate through different series
   */
  navigateSeries = (direction) => {
    const newSeriesIndex = this.state.currentSeriesIndex + direction;
    if (newSeriesIndex >= 0 && newSeriesIndex < this.state.seriesInstanceUIDs.length) {
      this.switchToSeries(newSeriesIndex);
    }
  }

  /**
   * Navigate through different files
   */
  navigateFile = (direction) => {
    const newFileIndex = this.state.currentFileIndex + direction;
    if (newFileIndex >= 0 && newFileIndex < this.state.loadedFiles.length) {
      this.switchToFile(newFileIndex);
    }
  }

  /**
   * Switch to a specific file by index
   */
  switchToFile = (fileIndex) => {
    if (fileIndex < 0 || fileIndex >= this.state.loadedDataIds.length) {
      return;
    }

    const dataId = this.state.loadedDataIds[fileIndex];
    if (dataId) {
      this.focusOnDataId(dataId);
      
      // Update file index
      this.setState({
        currentFileIndex: fileIndex
      });
    }
  }

  /**
   * Switch to a specific series by index
   */
  switchToSeries = (seriesIndex) => {
    if (seriesIndex < 0 || seriesIndex >= this.state.seriesInfo.length) {
      return;
    }

    const seriesData = this.state.seriesInfo[seriesIndex];
   
    if (seriesData && seriesData.dataIds && seriesData.dataIds.length > 0) {
      // Focus on the first image of the selected series
      this.focusOnDataId(seriesData.dataIds[0]);
     
      // Update series-related state
      this.setState({
        currentSeriesIndex: seriesIndex,
        currentImageIndex: 0,
        totalImages: seriesData.imageCount || 1,
        basicInfo: seriesData.basicInfo || this.state.basicInfo
      });
    }
  }

  /**
   * Focus on a specific DICOM data by ID
   */
  focusOnDataId = (dataId) => {
    if (this.state.dwvApp && dataId) {
      try {
        // Set this data as active view
        this.state.dwvApp.render(dataId);
       
        // Update metadata to match this image
        const metaData = this.state.dwvApp.getMetaData(dataId);
        
        // Update the file index
        const fileIndex = this.state.loadedDataIds.indexOf(dataId);
        if (fileIndex !== -1) {
          this.setState({
            currentFileIndex: fileIndex
          });
        }
        
        // Update current image index if scrolling within the same data
        const numberOfFrames = this.extractTagValue(metaData, '00280008');
        const totalImages = numberOfFrames ? parseInt(numberOfFrames, 10) : 1;
        
        this.setState({
          metaData: metaData,
          focusedDataId: dataId,
          totalImages: totalImages,
          currentImageIndex: 0, // Reset to first image when switching files
          
          // Extract basic patient info for the selected file
          basicInfo: {
            patientName: this.extractPatientName(metaData),
            patientId: this.extractTagValue(metaData, '00100020'), // Patient ID
            studyDate: this.formatDate(this.extractTagValue(metaData, '00080020')), // Study Date
            modality: this.extractTagValue(metaData, '00080060'), // Modality
            seriesDescription: this.extractTagValue(metaData, '0008103E'), // Series Description
          }
        });
      } catch (error) {
        console.error("Error focusing on data ID:", error);
      }
    }
  }

  componentDidMount() {
    // create app
    const app = new App();
    // initialise app
    app.init({
      "dataViewConfigs": { '*': [{ divId: 'layerGroup0' }] },
      "tools": this.state.tools
    });

    // setup event listeners
    this.setupAppEventListeners(app);
   
    // store
    this.setState({ dwvApp: app });

    // setup drop box
    this.setupDropbox(app);

    // possible load from location
    app.loadFromUri(window.location.href);
    
    // Add keyboard event listeners for navigation
    document.addEventListener('keydown', this.handleKeyNavigation);
  }
 
  componentWillUnmount() {
    // Clean up event listeners
    window.removeEventListener('resize', this.state.dwvApp.onResize);
    document.removeEventListener('keydown', this.handleKeyNavigation);
  }
  
  /**
   * Handle keyboard navigation between files and slices
   */
  handleKeyNavigation = (event) => {
    // Only handle if data is loaded
    if (!this.state.dataLoaded) return;
    
    // Prevent default behavior for these keys to avoid scrolling the page
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
      event.preventDefault();
    }
    
    // File navigation with left/right arrow keys
    if (this.state.loadedFiles.length > 1) {
      if (event.key === 'ArrowLeft' && !event.altKey) {
        this.navigateFile(-1);
      } else if (event.key === 'ArrowRight' && !event.altKey) {
        this.navigateFile(1);
      }
    }
    
    // Slice navigation with up/down arrow keys or Page Up/Down
    if (this.state.totalImages > 1) {
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        this.navigateSlice(-1);
      } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        this.navigateSlice(1);
      } else if (event.key === ' ') {
        // Spacebar for next slice (common in medical viewing)
        this.navigateSlice(1);
      }
    }
    
    // Number keys 1-9 for quick jumping to files (if 9 or fewer files)
    const numKey = parseInt(event.key);
    if (!isNaN(numKey) && numKey > 0 && numKey <= Math.min(9, this.state.loadedFiles.length)) {
      this.switchToFile(numKey - 1);
    }
  };

  /**
   * Close the current image and reset the viewer to accept new images
   */
  closeImage = () => {
    if (this.state.dwvApp && this.state.dataLoaded) {
      const app = this.state.dwvApp;
     
      try {
        // Try to reset display
        app.resetDisplay();
       
        // Get the layer group div and clear its contents manually
        const layerGroup = document.getElementById('layerGroup0');
        if (layerGroup) {
          // Keep only the dropBox element
          const dropBox = document.getElementById('dropBox');
         
          // Clear all child elements except dropBox
          while (layerGroup.firstChild) {
            layerGroup.removeChild(layerGroup.firstChild);
          }
         
          // Re-add the dropBox
          if (dropBox) {
            layerGroup.appendChild(dropBox);
          } else {
            // Create a new dropBox if it doesn't exist
            const newDropBox = document.createElement('div');
            newDropBox.id = 'dropBox';
            layerGroup.appendChild(newDropBox);
          }
        }
      } catch (error) {
        console.warn('Error resetting display:', error);
      }
     
      // Reset state
      this.setState({
        dataLoaded: false,
        loadProgress: 0,
        metaData: {},
        basicInfo: {
          patientName: '',
          patientId: '',
          studyDate: '',
          modality: '',
          seriesDescription: ''
        },
        currentImageIndex: 0,
        totalImages: 0,
        showInfoPanel: false,
        loadedFiles: [],
        loadedDataIds: [],
        seriesInstanceUIDs: [],
        currentSeriesIndex: 0,
        showNavigation: false,
        seriesInfo: [],
        focusedDataId: null,
        currentFileIndex: 0,
        showFileNavigation: false
      });
     
      // Create a completely new app instance
      this.resetDwvApplication();
     
      // Show the dropbox again to indicate readiness for new file
      this.showDropbox(this.state.dwvApp, true);
    }
  }

  /**
   * Reset the DWV application by recreating it
   * This is a more thorough cleanup than just resetting the display
   */
  resetDwvApplication = () => {
    // Create new app instance
    const newApp = new App();
   
    // Initialize with same config as before
    newApp.init({
      "dataViewConfigs": { '*': [{ divId: 'layerGroup0' }] },
      "tools": this.state.tools
    });

    // Remove old event listeners if needed
    // (this might be necessary depending on your DWV version)
    const oldApp = this.state.dwvApp;
    if (oldApp) {
      // You could remove event listeners here if needed
      // For most events, DWV handles this internally
    }
   
    // Set up the required event listeners again
    this.setupAppEventListeners(newApp);
   
    // Store the new app
    this.setState({ dwvApp: newApp });
   
    // Setup dropbox for the new app
    this.setupDropbox(newApp);
  }

  /**
   * Setup event listeners for a DWV App instance
   * @param {App} app The DWV App instance
   */
  setupAppEventListeners = (app) => {
    // Reimplement the necessary event listeners
    let nLoadItem = null;
    let nReceivedLoadError = null;
    let nReceivedLoadAbort = null;
    let isFirstRender = null;
   
    app.addEventListener('loadstart', (/*event*/) => {
      // reset flags
      nLoadItem = 0;
      nReceivedLoadError = 0;
      nReceivedLoadAbort = 0;
      isFirstRender = true;
      // hide drop box
      this.showDropbox(app, false);
    });
   
    app.addEventListener("loadprogress", (event) => {
      this.setState({ loadProgress: event.loaded });
    });
   
    app.addEventListener('renderend', (/*event*/) => {
      if (isFirstRender) {
        isFirstRender = false;
        // available tools
        let selectedTool = 'ZoomAndPan';
        if (app.canScroll()) {
          selectedTool = 'Scroll';
        }
        this.onChangeTool(selectedTool);
      }
    });
   
    app.addEventListener("load", (event) => {
      const metaData = app.getMetaData(event.dataid);
     
      // set dicom tags
      this.setState({ metaData: metaData });
     
      // extract basic patient info
      const basicInfo = {
        patientName: this.extractPatientName(metaData),
        patientId: this.extractTagValue(metaData, '00100020'), // Patient ID
        studyDate: this.formatDate(this.extractTagValue(metaData, '00080020')), // Study Date
        modality: this.extractTagValue(metaData, '00080060'), // Modality
        seriesDescription: this.extractTagValue(metaData, '0008103E'), // Series Description
      };
     
      // get total slices in the series if available
      const numberOfFrames = this.extractTagValue(metaData, '00280008');
      const totalImages = numberOfFrames ? parseInt(numberOfFrames, 10) : 1;

      // Add loaded file to the list (get file name if available)
      const fileName = this.extractTagValue(metaData, '00080018') || `Image ${event.dataid}`;
      const loadedFiles = [...this.state.loadedFiles];
     
      // Track data ID for direct access
      const loadedDataIds = [...this.state.loadedDataIds];
     
      // Check if we haven't already added this file
      if (!loadedFiles.includes(fileName)) {
        loadedFiles.push(fileName);
        loadedDataIds.push(event.dataid);
      }
     
      // Get Series Instance UID for tracking multiple series
      const seriesUID = this.extractTagValue(metaData, '0020000E');
      const seriesUIDs = [...this.state.seriesInstanceUIDs];
      let seriesInfo = [...this.state.seriesInfo];
     
      // Check if this is a new series
      let currentSeriesIndex = this.state.currentSeriesIndex;
      if (seriesUID && !seriesUIDs.includes(seriesUID)) {
        seriesUIDs.push(seriesUID);
        currentSeriesIndex = seriesUIDs.length - 1;
       
        // Add new series info
        seriesInfo.push({
          uid: seriesUID,
          dataIds: [event.dataid],
          imageCount: totalImages,
          description: basicInfo.seriesDescription,
          basicInfo: basicInfo
        });
      } else if (seriesUID) {
        // Add to existing series
        const existingSeriesIndex = seriesUIDs.indexOf(seriesUID);
        if (existingSeriesIndex >= 0) {
          // Update series info
          const updatedSeriesInfo = [...seriesInfo];
          updatedSeriesInfo[existingSeriesIndex].dataIds.push(event.dataid);
          updatedSeriesInfo[existingSeriesIndex].imageCount =
            Math.max(updatedSeriesInfo[existingSeriesIndex].imageCount, totalImages);
          seriesInfo = updatedSeriesInfo;
        }
      }
     
      this.setState({
        basicInfo: basicInfo,
        totalImages: totalImages,
        currentImageIndex: 0,
        dataLoaded: true,
        loadedFiles: loadedFiles,
        loadedDataIds: loadedDataIds,
        seriesInstanceUIDs: seriesUIDs,
        seriesInfo: seriesInfo,
        currentSeriesIndex: currentSeriesIndex,
        showNavigation: totalImages > 1,
        focusedDataId: event.dataid
      });
    });
   
    // Listen for slice changes
    app.addEventListener('slicechange', (event) => {
      this.setState({ currentImageIndex: event.value });
    });
   
    app.addEventListener('loadend', (/*event*/) => {
      if (nReceivedLoadError) {
        this.setState({ loadProgress: 0 });
        alert('Received errors during load. Check log for details.');
        // show drop box if nothing has been loaded
        if (!nLoadItem) {
          this.showDropbox(app, true);
        }
      }
      if (nReceivedLoadAbort) {
        this.setState({ loadProgress: 0 });
        alert('Load was aborted.');
        this.showDropbox(app, true);
      }
     
      // If multiple files are loaded, enable navigation controls
      if (this.state.loadedFiles.length > 1) {
        this.setState({ showNavigation: true });
      }
    });
   
    app.addEventListener('loaditem', (/*event*/) => {
      ++nLoadItem;
    });
   
    app.addEventListener('loaderror', (event) => {
      console.error(event.error);
      ++nReceivedLoadError;
    });
   
    app.addEventListener('loadabort', (/*event*/) => {
      ++nReceivedLoadAbort;
    });

    // handle key events
    app.addEventListener('keydown', (event) => {
      app.defaultOnKeydown(event);
    });
   
    // handle window resize
    window.addEventListener('resize', app.onResize);
  }

  /**
   * Extract tag value from DICOM metadata
   */
  extractTagValue = (metaData, tagId) => {
    if (metaData && metaData[tagId]) {
      return metaData[tagId].value;
    }
    return '';
  }

  /**
   * Format DICOM date (YYYYMMDD)
   */
  formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) {
      return dateString;
    }
   
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
   
    return `${year}-${month}-${day}`;
  }

  /**
   * Extract patient name from DICOM metadata
   */
  extractPatientName = (metaData) => {
    const patientName = this.extractTagValue(metaData, '00100010');
    if (!patientName) return '';
   
    // Handle different formats (Last^First)
    if (patientName.includes('^')) {
      const parts = patientName.split('^');
      return `${parts[1]} ${parts[0]}`.trim();
    }
   
    return patientName;
  }

  /**
   * Get the icon of a tool.
   *
   * @param {string} tool The tool name.
   * @returns {Icon} The associated icon.
   */
  getToolIcon = (tool) => {
    let res;
    if (tool === 'Scroll') {
      res = (<MenuIcon />);
    } else if (tool === 'ZoomAndPan') {
      res = (<SearchIcon />);
    } else if (tool === 'WindowLevel') {
      res = (<ContrastIcon />);
    } else if (tool === 'Draw') {
      res = (<StraightenIcon />);
    }
    return res;
  }

  /**
   * Handle a change tool event.
   * @param {string} tool The new tool name.
   */
  onChangeTool = (tool) => {
    if (this.state.dwvApp) {
      this.setState({ selectedTool: tool });
      this.state.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.state.tools.Draw.options[0]);
      }
    }
  }

  /**
   * Check if a tool can be run.
   *
   * @param {string} tool The tool name.
   * @returns {boolean} True if the tool can be run.
   */
  canRunTool = (tool) => {
    let res;
    if (tool === 'Scroll') {
      res = this.state.dwvApp.canScroll();
    } else if (tool === 'WindowLevel') {
      res = this.state.dwvApp.canWindowLevel();
    } else {
      res = true;
    }
    return res;
  }

  /**
   * Toogle the viewer orientation.
   */
  toggleOrientation = () => {
    if (typeof this.state.orientation !== 'undefined') {
      if (this.state.orientation === 'axial') {
        this.state.orientation = 'coronal';
      } else if (this.state.orientation === 'coronal') {
        this.state.orientation = 'sagittal';
      } else if (this.state.orientation === 'sagittal') {
        this.state.orientation = 'axial';
      }
    } else {
      // default is most probably axial
      this.state.orientation = 'coronal';
    }
    // update data view config
    const config = {
      '*': [
        {
          divId: 'layerGroup0',
          orientation: this.state.orientation
        }
      ]
    };
    this.state.dwvApp.setDataViewConfigs(config);
    // render data
    const dataIds = this.state.dwvApp.getDataIds();
    for (const dataId of dataIds) {
      this.state.dwvApp.render(dataId);
    }
  }

  /**
   * Handle a change draw shape event.
   * @param {string} shape The new shape name.
   */
  onChangeShape = (shape) => {
    if (this.state.dwvApp) {
      this.state.dwvApp.setToolFeatures({ shapeName: shape });
    }
  }

  /**
   * Handle a reset event.
   */
  onReset = () => {
    if (this.state.dwvApp) {
      this.state.dwvApp.resetDisplay();
    }
  }

  /**
   * Open the DICOM tags dialog.
   */
  handleTagsDialogOpen = () => {
    this.setState({ showDicomTags: true });
  }

  /**
   * Close the DICOM tags dialog.
   */
  handleTagsDialogClose = () => {
    this.setState({ showDicomTags: false });
  };

  // drag and drop [begin] -----------------------------------------------------

  /**
   * Setup the data load drop box: add event listeners and set initial size.
   */
  setupDropbox = (app) => {
    // The HTML element
    console.log("test")
    const dropboxDiv = document.getElementById(this.state.dropboxDivId);
    if (!dropboxDiv) {
      return;
    }
  
    // Add initial message to dropbox
    const dropboxMsg = document.createElement('div');
    dropboxMsg.className = 'dropbox-message';
    dropboxMsg.innerHTML = '<p>Drag and drop DICOM files here<br>or click to select files</p>';
    dropboxDiv.appendChild(dropboxMsg);
  
    // Clear previous event listeners if any
    const oldDropbox = dropboxDiv.cloneNode(true);
    dropboxDiv.parentNode.replaceChild(oldDropbox, dropboxDiv);
    const newDropbox = oldDropbox;
  
    // Style to show drag is over
    const addDragOverClass = (event) => {
      event.stopPropagation();
      event.preventDefault();
      newDropbox.classList.add(this.state.hoverClassName);
    };
    // Style to show drag is not over
    const removeDragOverClass = (event) => {
      event.stopPropagation();
      event.preventDefault();
      newDropbox.classList.remove(this.state.hoverClassName);
    };
    // Handle the drop event
    const onDrop = (event) => {
      event.stopPropagation();
      event.preventDefault();
      newDropbox.classList.remove(this.state.hoverClassName);
      
      // Load files
      app.loadFiles(event.dataTransfer.files);
    };
    
    // Add event listeners
    newDropbox.addEventListener('dragover', addDragOverClass);
    newDropbox.addEventListener('dragleave', removeDragOverClass);
    newDropbox.addEventListener('drop', onDrop);
    
    // Add click to select files capability
    newDropbox.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true; // Allow multiple file selection
      fileInput.accept = '.dcm'; // Accept DICOM files
      
      fileInput.onchange = (event) => {
        if (event.target.files.length > 0) {
          app.loadFiles(event.target.files);
        }
      };
      
      fileInput.click();
    });
  };

  showDropbox = (app, show) => {
    const box = document.getElementById(this.state.dropboxDivId);
    if (!box) {
      return;
    }
    const layerDiv = document.getElementById('layerGroup0');

    if (show) {
      // reset css class
      box.className = this.state.dropboxClassName + ' ' + this.state.borderClassName;
      // check content
      if (box.innerHTML === '') {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode('Drag and drop DICOM data here or '));
        // input file
        const input = document.createElement('input');
        input.onchange = this.onInputFile;
        input.type = 'file';
        input.multiple = true;
        input.id = 'input-file';
        input.style.display = 'none';
        const label = document.createElement('label');
        label.htmlFor = 'input-file';
        const link = document.createElement('a');
        link.appendChild(document.createTextNode('click here'));
        link.id = 'input-file-link';
        label.appendChild(link);
        p.appendChild(input);
        p.appendChild(label);

        box.appendChild(p);
      }
      // show box
      box.setAttribute('style', 'display:initial');
      // stop layer listening
      if (layerDiv) {
        layerDiv.removeEventListener('dragover', this.defaultHandleDragEvent);
        layerDiv.removeEventListener('dragleave', this.defaultHandleDragEvent);
        layerDiv.removeEventListener('drop', this.onDrop);
      }
      // listen to box events
      box.addEventListener('dragover', this.onBoxDragOver);
      box.addEventListener('dragleave', this.onBoxDragLeave);
      box.addEventListener('drop', this.onDrop);
    } else {
      // remove border css class
      box.className = this.state.dropboxClassName;
      // remove content
      box.innerHTML = '';
      // hide box
      box.setAttribute('style', 'display:none');
      // stop box listening
      box.removeEventListener('dragover', this.onBoxDragOver);
      box.removeEventListener('dragleave', this.onBoxDragLeave);
      box.removeEventListener('drop', this.onDrop);
      // listen to layer events
      if (layerDiv) {
        layerDiv.addEventListener('dragover', this.defaultHandleDragEvent);
        layerDiv.addEventListener('dragleave', this.defaultHandleDragEvent);
        layerDiv.addEventListener('drop', this.onDrop);
      }
    }
  }



  renderThumbnailPanel = () => {
    const { loadedDataIds, focusedDataId, dwvApp } = this.state;
    
    if (!loadedDataIds || loadedDataIds.length <= 1 || !dwvApp) {
      return null;
    }
    
    return (
      <Box className={this.props.classes.thumbnailPanel}>
        <Typography variant="subtitle1" gutterBottom>
          Loaded Files ({loadedDataIds.length})
        </Typography>
        <Box className={this.props.classes.thumbnailContainer}>
          {loadedDataIds.map((dataId, index) => {
            const isActive = dataId === focusedDataId;
            const metadata = dwvApp.getMetaData(dataId);
            const description = this.extractTagValue(metadata, '0008103E') || `Image ${index + 1}`;
            
            return (
              <Box 
                key={dataId}
                className={this.props.classes.thumbnail}
                sx={{ 
                  border: isActive ? '2px solid #1976d2' : '1px solid #ccc',
                  backgroundColor: isActive ? '#e3f2fd' : 'transparent'
                }}
                onClick={() => this.switchToFile(index)}
              >
                <Typography variant="caption" noWrap>
                  {description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  renderFileNavigation = () => {
    const { loadedFiles, currentFileIndex, classes } = this.state;
    
    if (loadedFiles.length <= 1) {
      return null;
    }
    
    return (
      <Box className={classes.fileNavigation}>
        <IconButton
          onClick={() => this.navigateFile(-1)}
          disabled={currentFileIndex === 0}
          size="small"
        >
          <NavigateBeforeIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" className={classes.seriesNavigationText}>
            File {currentFileIndex + 1} / {loadedFiles.length}
          </Typography>
          
          {/* Add a simple progress indicator */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
            {loadedFiles.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  mx: 0.5,
                  bgcolor: index === currentFileIndex ? 'primary.main' : 'grey.300',
                  cursor: 'pointer'
                }}
                onClick={() => this.switchToFile(index)}
              />
            ))}
          </Box>
        </Box>
        
        <IconButton
          onClick={() => this.navigateFile(1)}
          disabled={currentFileIndex === loadedFiles.length - 1}
          size="small"
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    );
  };
  
  

  /**
   * Show/hide the data load drop box.
   * @param show True to show the drop box.
   */
 

  // drag and drop [end] -------------------------------------------------------

} // DwvComponent

DwvComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DwvComponent);