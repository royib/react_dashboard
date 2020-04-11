import React from "react";
import "./ActionBar.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

export default props => {
  //const [status, setStatus] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { status, onStatusChange, onSearch } = props;

  const handleSerchChange = event => {
    setSearchText(event.target.value);
  };
  const handleRefresh = () => {
    // setSearchText("");
    props.onRefresh();
  };
  return (
    <div className="actionBarContainer">
      <div className="status">
        <FormControl variant="outlined" className="statusSelect">
          <InputLabel>Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            onChange={event => {
              onStatusChange(event.target.value);
              setSearchText("");
            }}
            label="status"
          >
            <MenuItem value={0}>Select Status</MenuItem>
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={2}>Approved</MenuItem>
            <MenuItem value={3}>Rejected</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="actionsContainer">
        <IconButton size="small" aria-label="unlock" onClick={props.onRealese}>
          <LockOpenIcon style={{ fontSize: 20 }} />
          Release
        </IconButton>
        <IconButton size="small" aria-label="unlock" onClick={props.onReject}>
          <CloseIcon style={{ fontSize: 20 }} />
          Reject
        </IconButton>
        <IconButton size="small" aria-label="unlock" onClick={handleRefresh}>
          <RefreshIcon style={{ fontSize: 20 }} />
          Refresh
        </IconButton>
      </div>
      <div className="searchbarContainer">
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSerchChange}
          value={searchText}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => onSearch(searchText)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            className: "regularInput"
          }}
        />
      </div>
    </div>
  );
};
