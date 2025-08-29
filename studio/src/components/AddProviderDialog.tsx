
"use client";

import { useState, type ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ServiceProvider, DirectoryEntryType } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AddProviderDialogProps {
  children: ReactNode;
  onAddProvider: (provider: ServiceProvider) => void;
}

const defaultProvider: Omit<ServiceProvider, 'id' | 'rating' | 'reviews' | 'projects' | 'certifications' | 'skills' | 'products'> & { certifications: string, skills: string } = {
    name: '',
    type: 'Electrician',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: '',
    experience: 0,
    skills: '',
    certifications: '',
    bio: '',
    workingHours: '',
    contact: { phone: '', email: '' },
};


export function AddProviderDialog({ children, onAddProvider }: AddProviderDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(defaultProvider);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'phone' || id === 'email') {
        setFormData(prev => ({...prev, contact: { ...prev.contact, [id]: value }}));
    } else {
        setFormData(prev => ({...prev, [id]: value }));
    }
  };

  const handleTypeChange = (value: DirectoryEntryType) => {
    setFormData(prev => ({...prev, type: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.location || !formData.bio) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill out all required fields.",
        });
        return;
    }

    const newProvider: ServiceProvider = {
        ...formData,
        id: '', // Will be set in the parent
        experience: Number(formData.experience),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map(c => c.trim()).filter(Boolean),
        projects: [],
        reviews: [],
        rating: 0,
    };
    
    onAddProvider(newProvider);
    setOpen(false);
    setFormData(defaultProvider);
  };
  
  const isServiceProvider = formData.type === 'Electrician' || formData.type === 'Plumber';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Directory Entry</DialogTitle>
            <DialogDescription>
              Fill in the details for the new entry. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="col-span-3 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Electrician" id="r-electrician" />
                    <Label htmlFor="r-electrician">Electrician</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Plumber" id="r-plumber" />
                    <Label htmlFor="r-plumber">Plumber</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Hardware Store" id="r-store" />
                    <Label htmlFor="r-store">Hardware Store</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input id="location" value={formData.location} onChange={handleChange} required className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right pt-2">Bio</Label>
              <Textarea id="bio" value={formData.bio} onChange={handleChange} required className="col-span-3" placeholder="A brief description of the provider or store." />
            </div>
            {isServiceProvider && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">Experience (yrs)</Label>
                  <Input id="experience" type="number" value={formData.experience} onChange={handleChange} required={isServiceProvider} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skills" className="text-right">Skills</Label>
                    <Input id="skills" value={formData.skills} onChange={handleChange} className="col-span-3" placeholder="Comma-separated skills" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="certifications" className="text-right">Certifications</Label>
                    <Input id="certifications" value={formData.certifications} onChange={handleChange} className="col-span-3" placeholder="Comma-separated certifications" />
                </div>
              </>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={formData.contact.phone} onChange={handleChange} required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={formData.contact.email} onChange={handleChange} required className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workingHours" className="text-right">Working Hours</Label>
              <Input id="workingHours" value={formData.workingHours} onChange={handleChange} className="col-span-3" placeholder="e.g., Mon-Fri, 9am-5pm" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Entry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
