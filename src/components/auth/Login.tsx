import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDictionary } from "../context/DictionaryProvider";
import LoginContent from "./LoginContent";
import SignUpContent from "./SignUpContent";
import { useState } from "react";

export default function Login() {
    const dictionary = useDictionary();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const closeDialog = () => setIsDialogOpen(false);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {dictionary.auth.signIn}
            </DialogTrigger>
            <DialogContent>
                <Tabs defaultValue="account" className="w-full mt-3">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="signIn">{dictionary.auth.signIn}</TabsTrigger>
                        <TabsTrigger className="w-full" value="signUp">{dictionary.auth.signUp}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signIn">
                        <LoginContent {...{ closeDialog }} />
                    </TabsContent>

                    <TabsContent value="signUp">
                        <SignUpContent {...{ closeDialog }} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}