import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDictionary } from "../context/DictionaryProvider";
import { Button } from "../ui/button";
import LoginContent from "./LoginContent";
import SignUpContent from "./SignUpContent";
import { useState } from "react";

export default function Login() {
    const dictionary = useDictionary();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    const toggleDialog = (bool: boolean) => setDialogOpen(!bool);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {dictionary.auth.signIn}
            </DialogTrigger>
            <DialogContent>
                <Tabs defaultValue="account" className="w-full mt-3">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-full" value="signIn">{dictionary.auth.signIn}</TabsTrigger>
                        <TabsTrigger className="w-full" value="signUp">{dictionary.auth.signUp}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signIn">
                        <LoginContent closeDialog={toggleDialog} />
                    </TabsContent>

                    <TabsContent value="signUp">
                        <SignUpContent closeDialog={toggleDialog} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}