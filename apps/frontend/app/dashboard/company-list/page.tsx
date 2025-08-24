"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  Trash,
  Pencil,
  Building2,
  Mail,
  MapPin,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Company {
  company_id: number;
  name: string;
  industry: string;
  location: string;
  contact_email: string;
  contacts: {
    contact_id: number;
    name: string;
    email: string;
    designation: string;
    category?: string;
  }[];
  media_contacts: {
    media_contact_id: number;
    name: string;
    email: string;
    organization: string;
    designation: string;
    category: string;
  }[];
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: "",
    contact_email: "",
    contacts: [{ name: "", email: "", designation: "" }],
    media_contacts: [
      {
        name: "",
        email: "",
        organization: "",
        designation: "",
        category: "PRESS",
      },
    ],
  });

  const [feedback, setFeedback] = useState<{
    title: string;
    message: string;
    open: boolean;
  }>({
    title: "",
    message: "",
    open: false,
  });

  const showFeedback = (title: string, message: string) => {
    setFeedback({ title, message, open: true });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/companies");
      setCompanies(res.data);
      setLoading(false);
    } catch {
      showFeedback("Error", "Failed to fetch companies");
    }
  };

  const handleSubmit = async () => {
    const url = editingCompanyId
      ? `http://localhost:3001/api/companies/${editingCompanyId}`
      : "http://localhost:3001/api/companies";
    const method = editingCompanyId ? "put" : "post";

    try {
      await axios({ method, url, data: form });
      showFeedback(
        editingCompanyId ? "Company Updated" : "Company Created",
        editingCompanyId
          ? "The company details were updated."
          : "New company was created."
      );
      setModalOpen(false);
      setEditingCompanyId(null);
      resetForm();
      fetchCompanies();
    } catch {
      showFeedback("Error", "Failed to save company");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`http://localhost:3001/api/companies/${id}`);
        showFeedback("Deleted", "Company deleted successfully.");
        fetchCompanies();
      } catch {
        showFeedback("Error", "Failed to delete company");
      }
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompanyId(company.company_id);
    setForm({
      name: company.name,
      industry: company.industry,
      location: company.location,
      contact_email: company.contact_email,
      contacts: company.contacts.map((c) => ({
        name: c.name,
        email: c.email,
        designation: c.designation,
      })),
      media_contacts:
        company.media_contacts?.map((m) => ({
          name: m.name,
          email: m.email,
          organization: m.organization,
          designation: m.designation,
          category: m.category,
        })) || [],
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      industry: "",
      location: "",
      contact_email: "",
      contacts: [{ name: "", email: "", designation: "" }],
      media_contacts: [
        {
          name: "",
          email: "",
          organization: "",
          designation: "",
          category: "PRESS",
        },
      ],
    });
  };

  return (
    <main className="relative z-10 px-6 pb-16">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Company
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Listing
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Please add company to file your complaint.
          </p>
        </div>

        {/* Feedback Dialog */}
        <Dialog
          open={feedback.open}
          onOpenChange={(open) => setFeedback((f) => ({ ...f, open }))}
        >
          <DialogContent className="max-w-md text-center">
            <h2 className="text-lg font-semibold">{feedback.title}</h2>
            <p className="text-sm mt-2 text-gray-600">{feedback.message}</p>
            <div className="mt-4 text-right">
              <Button
                onClick={() => setFeedback((f) => ({ ...f, open: false }))}
              >
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Companies</h1>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingCompanyId(null);
                  resetForm();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> New Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                  {editingCompanyId ? "Edit Company" : "Add New Company"}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input
                      value={form.industry}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, industry: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={form.location}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, location: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input
                      value={form.contact_email}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          contact_email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Company Contacts */}
                <div className="space-y-2">
                  <h3 className="font-medium">Company Contacts</h3>
                  {form.contacts.map((c, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-4">
                      <Input
                        placeholder="Name"
                        value={c.name}
                        onChange={(e) => {
                          const updated = [...form.contacts];
                          updated[idx].name = e.target.value;
                          setForm((f) => ({ ...f, contacts: updated }));
                        }}
                      />
                      <Input
                        placeholder="Email"
                        value={c.email}
                        onChange={(e) => {
                          const updated = [...form.contacts];
                          updated[idx].email = e.target.value;
                          setForm((f) => ({ ...f, contacts: updated }));
                        }}
                      />
                      <Input
                        placeholder="Designation"
                        value={c.designation}
                        onChange={(e) => {
                          const updated = [...form.contacts];
                          updated[idx].designation = e.target.value;
                          setForm((f) => ({ ...f, contacts: updated }));
                        }}
                      />
                    </div>
                  ))}
                  <Button
                    // variant="outline"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        contacts: [
                          ...f.contacts,
                          { name: "", email: "", designation: "" },
                        ],
                      }))
                    }
                  >
                    + Add Contact
                  </Button>
                </div>

                {/* Media Contacts */}
                <div className="space-y-2">
                  <h3 className="font-medium">Media Contacts</h3>
                  {form.media_contacts.map((m, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-6 gap-2 items-center"
                    >
                      <Input
                        placeholder="Name"
                        value={m.name}
                        onChange={(e) => {
                          const updated = [...form.media_contacts];
                          updated[idx].name = e.target.value;
                          setForm((f) => ({ ...f, media_contacts: updated }));
                        }}
                      />
                      <Input
                        placeholder="Email"
                        value={m.email}
                        onChange={(e) => {
                          const updated = [...form.media_contacts];
                          updated[idx].email = e.target.value;
                          setForm((f) => ({ ...f, media_contacts: updated }));
                        }}
                      />
                      <Input
                        placeholder="Organization"
                        value={m.organization}
                        onChange={(e) => {
                          const updated = [...form.media_contacts];
                          updated[idx].organization = e.target.value;
                          setForm((f) => ({ ...f, media_contacts: updated }));
                        }}
                      />
                      <Input
                        placeholder="Designation"
                        value={m.designation}
                        onChange={(e) => {
                          const updated = [...form.media_contacts];
                          updated[idx].designation = e.target.value;
                          setForm((f) => ({ ...f, media_contacts: updated }));
                        }}
                      />
                      <select
                        value={m.category}
                        onChange={(e) => {
                          const updated = [...form.media_contacts];
                          updated[idx].category = e.target.value;
                          setForm((f) => ({ ...f, media_contacts: updated }));
                        }}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="PRESS">PRESS</option>
                        <option value="TV">TV</option>
                        <option value="ONLINE">ONLINE</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                      <Button
                        // variant="ghost"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            media_contacts: f.media_contacts.filter(
                              (_, i) => i !== idx
                            ),
                          }))
                        }
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    // variant="outline"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        media_contacts: [
                          ...f.media_contacts,
                          {
                            name: "",
                            email: "",
                            organization: "",
                            designation: "",
                            category: "PRESS",
                          },
                        ],
                      }))
                    }
                  >
                    + Add Media Contact
                  </Button>
                </div>

                <div className="text-right">
                  <Button onClick={handleSubmit}>
                    {editingCompanyId ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p>Loading companies...</p>
        ) : (
         <div className="grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-300">
  {companies.map((company, index) => {
    const initials = company.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);

    return (
      <div
        key={company.company_id}
        className={`group bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 hover:bg-white/15 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-xl`}
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: "forwards",
        }}
      >
        {/* Company Initials */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-gray-800 font-bold text-lg">{initials}</span>
          </div>
        </div>

        {/* Company Name */}
        <h3 className="text-white font-semibold text-lg text-center mb-2">
          {company.name}
        </h3>

        {/* Industry */}
        <p className="text-center text-sm text-white/70 mb-1">
          <Building2 className="inline mr-1" size={14} />
          {company.industry}
        </p>

        {/* Location */}
        <p className="text-center text-sm text-white/70 mb-1">
          <MapPin className="inline mr-1" size={14} />
          {company.location}
        </p>

        {/* Contact Email */}
        <p className="text-center text-sm text-white/70 mb-4">
          <Mail className="inline mr-1" size={14} />
          {company.contact_email}
        </p>

        {/* Company Contacts */}
        {company.contacts.length > 0 && (
          <div className="text-sm text-white/80 mb-3">
            <h4 className="font-semibold mb-1">Contacts:</h4>
            <ul className="list-disc ml-5 space-y-1 text-xs">
              {company.contacts.map((c) => (
                <li key={c.contact_id}>
                  {c.name} ({c.designation}) – {c.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Media Contacts */}
        {company.media_contacts?.length > 0 && (
          <div className="text-sm text-white/80">
            <h4 className="font-semibold mb-1">Media Contacts:</h4>
            <ul className="list-disc ml-5 space-y-1 text-xs">
              {company.media_contacts.map((m) => (
                <li key={m.media_contact_id}>
                  {m.name} ({m.designation}, {m.organization}) – {m.email}{" "}
                  [{m.category}]
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handleEdit(company)}
            className="text-white/70 hover:text-white transition"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(company.company_id)}
            className="text-red-400 hover:text-red-600 transition"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    );
  })}
</div>

        )}
      </div>
    </main>
  );
}
