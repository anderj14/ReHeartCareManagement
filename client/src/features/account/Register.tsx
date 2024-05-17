import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

export default function Register() {

    const navigate = useNavigate();

    const { register, setError, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error });
                } else if (error.includes('Email')) {
                    setError('email', { message: error });
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box component="form"
                            noValidate onSubmit={handleSubmit(data => agent.Account.register(data)
                                .then(() => {
                                    toast.success('Registration successful - you can now login');
                                    navigate('/login');
                                })
                                .catch(error => handleApiErrors(error)))}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Username"
                                autoFocus
                                {...register('username', { required: 'Username is required' })}
                                error={!!errors.username}
                                helperText={errors?.username?.message as string}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                                        message: 'Not valid email address'
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors?.email?.message as string}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                        message: 'Password does not meet complexity requirements'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors?.password?.message as string}
                            />
                            {/* {validationErrors.length > 0 &&
                                <Alert severity="error">
                                    <AlertTitle>Validation Errors</AlertTitle>
                                    <List>
                                        {validationErrors.map(error => (
                                            <ListItem>
                                                <ListItemText>{error}</ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Alert>
                            } */}
                            <Button
                                disabled={!isValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}