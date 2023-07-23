import React from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root.Mui-focused": {
    color: theme.palette.primary.main, // Change the label color on focus
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    color: "white", // Change the text color on focus
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main, // Change the border color on focus
  },
}));

const StyledInput = styled("input")({
  display: "none", // Hide the default file input element
});

const MyFileInput = ({ handleBlur, handleChange, values, touched, errors }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // You can now handle the selected file and its data if needed.
    handleChange({
      target: {
        name: "categoryImg",
        value: file, // Save the selected file to the 'categoryImg' field in your form values
      },
    });
  };

  return (
    <Box>
      <StyledInput
        accept="image/*" // Specify accepted file types (in this case, images)
        id="category-image-input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="category-image-input">
        <StyledTextField
          fullWidth
          variant="outlined"
          type="text"
          label="Category Image"
          onBlur={handleBlur}
          value={""} // Show the selected file name as the value of the TextField
          sx={{
            gridColumn: "span 2",
          }}
        />
      </label>
    </Box>
  );
};

export default MyFileInput;
