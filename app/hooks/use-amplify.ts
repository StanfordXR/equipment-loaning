import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

export default function useAmplify() {
    Amplify.configure(outputs, {ssr: true});
    // cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
}