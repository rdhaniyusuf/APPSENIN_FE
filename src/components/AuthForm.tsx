'use client';
import React from "react";
import { HiEyeSlash, HiEye } from 'react-icons/hi2';
import { Form, Input, Button, Checkbox } from "@heroui/react";

interface AuthFormProps {
    onSubmit: (username: string, password: string) => void;
    mode?: 'login' | 'register';
}

const AuthFormComp: React.FC<AuthFormProps> = ({
    onSubmit, mode = 'login'
}) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const errors: string[] = [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        // Tambahkan timer sebelum onSubmit dipanggil
        setTimeout(async () => {
            await onSubmit(username, password);
            setLoading(false); // Set loading ke false setelah onSubmit selesai
        }, 2000); // Timer 2000ms (2 detik)
    };
    

    if (password && password.length < 4) {
        errors.push("Password must be 4 characters or more.");
    }
    if (password && (password.match(/[A-Z]/g) || []).length < 1) {
        errors.push("Password must include at least 1 upper case letter");
    }
    if (password && (password.match(/[^a-z0-9]/gi) || []).length < 1) {
        errors.push("Password must include at least 1 symbol.");
    }

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <Form 
            className="w-full max-w-xs flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={(e) => {
                handleSubmit(e);
            }
            }
        >
            <Input
                isRequired
                autoComplete='username'
                label="Username"
                type="username"
                className='xl:h-max'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
            />

            <Input
                isRequired
                autoComplete='current-password'
                className="flex flex-wrap justify-between xl:h-max"
                endContent={
                    <button
                        aria-label="toggle password visibility"
                        type="button"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <HiEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                isInvalid={errors.length > 0}
                label="Password"
                type={isVisible ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={() => (
                    <ul>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                )}
            />
            <div className="flex w-full items-center justify-between px-1 py-2">
                <Checkbox defaultSelected name="remember" size="sm">
                    Remember me
                </Checkbox>
            </div>
            <div className="flex gap-2">
                <Button color="primary" type="submit" isLoading={loading} isDisabled={loading}>
                    {loading ? 'Submitting' : mode === 'login' ? 'Log In' : 'Register'}
                </Button>
            </div>

        </Form>
    );
}

export default AuthFormComp;