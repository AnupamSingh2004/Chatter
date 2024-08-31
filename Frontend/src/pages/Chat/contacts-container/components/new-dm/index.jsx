import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import React, {useState} from "react";
import {FaPlus} from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import axios from "axios";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarImage} from "@/components/ui/avatar.jsx";
import {getColor} from "@/lib/utils.js";
import {useAppStore} from "@/store/index.js";

export const NewDm = () => {

    const {setSelectedChatType, setSelectedChatData} = useAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const res = await axios.post("http://localhost:6005/search",
                    {searchTerm}, {withCredentials: true});

                if (res.status === 200 && res.data.contacts) {
                    setSearchedContacts(res.data.contacts);
                } else {
                    setSearchedContacts([]);
                }
            }
        } catch (e) {
            console.log(e);


        }
    }

    const selectNewContact = async (contact) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className={"text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer"}
                            onClick={() => setOpenNewContactModal(true)}/>
                    </TooltipTrigger>
                    <TooltipContent className={"bg-[#1c1b1e] border-none mb-2 p-3 text-white"}>
                        Select New Contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className={"bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col"}>
                    <DialogHeader>
                        <DialogTitle className={"flex items-center justify-center"}>Please select a
                            Contact</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input placeholder={"Search contact"}
                               className={"rounded-lg bg-[#2c2e3b] border-none p-6"}
                               onChange={e => searchContacts(e.target.value)}/>
                    </div>
                    <ScrollArea className={"h-[250px]"}>
                        <div className="flex flex-col gap-5">
                            {searchedContacts.map((contact) => (
                                <div key={contact._id} className={"flex gap-3 cursor-pointer items-center"}
                                     onClick={() => selectNewContact(contact)}>
                                    <div className="w-12 h-12 relative">

                                        <Avatar className={"h-12 w-12 rounded-full overflow-hidden "}>
                                            {
                                                !contact.image ? (
                                                    <AvatarImage src={contact.image}
                                                                 className={"object-cover w-full h-full bg-black"}
                                                    />) : (
                                                    <div
                                                        className={`uppercase h-12 w-12  text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(contact.color)} `}
                                                    >

                                                        {contact.displayName ? contact.displayName.split("").shift() : contact.displayName.split("").shift()}
                                                    </div>)
                                            }
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>
                                            {contact.displayName ? `${contact.displayName} ` : contact.email}
                                        </span>
                                        <span className={"text-xs"}>{contact.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    {searchedContacts.length <= 0 && (
                        <div
                            className={"poppins-medium flex items-center justify-center mt-[-160px] text-xl text-neutral-500"}>Search
                            for
                            People to
                            Chat 😄</div>
                    )}

                </DialogContent>
            </Dialog>

        </>
    )
}
