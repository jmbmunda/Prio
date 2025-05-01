"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal";
import React from "react";
import ChecklistEditorModal from "./ChecklistEditorModal";

const AddItem = () => {
  const { showModal } = useModal();

  const handleAddClick = () => {
    showModal({
      id: "add-checklist-item",
      title: "New Checklist Item",
      component: ChecklistEditorModal,
    });
  };

  return (
    <Button
      className="w-full bg-background/10 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-none hover:bg-foreground/10"
      onClick={handleAddClick}
    >
      Add an item
    </Button>
  );
};

export default AddItem;
