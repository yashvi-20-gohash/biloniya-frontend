// import { Controller, useFormContext, FieldValues } from 'react-hook-form';

// // Define the props type for RHFEditor component
// interface RHFEditorProps {
//   name: string;
//   helperText?: string;
//   [key: string]: any; // To allow passing any other props to the Editor component
// }
// export function RHFEditor({ name, helperText, ...other }: RHFEditorProps) {
//   const {
//     control,
//     formState: { isSubmitSuccessful },
//   } = useFormContext<FieldValues>(); // Make sure to pass FieldValues for better type inference
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Editor
//           {...field}
//           error={!!error}
//           helperText={helperText ?? error?.message}
//           resetValue={isSubmitSuccessful}
//           {...other}
//         />
//       )}
//     />
//   );
// }
