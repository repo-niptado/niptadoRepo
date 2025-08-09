import React, { useState, useEffect } from "react";
import { Tv, TrendingUp, Check, ArrowRight, Zap, Star } from "lucide-react";

// MediaContact interface
interface MediaContact {
  media_contact_id: number;
  name: string;
  email: string;
  designation: string;
  organization: string;
  category: string;
  responseRate?: number;
  avgResponseTime?: string;
  audienceReach?: string;
}

// Props interface
interface SelectMediaContactsProps {
  mediaContacts: MediaContact[];
  selectedMediaContactIds: string[];
  onMediaContactSelection: (id: string) => void;
  companyName?: string;
}

// OutletCard component
interface OutletCardProps {
  media: MediaContact;
  index: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
}
const OutletCard: React.FC<OutletCardProps> = ({
  media,
  index,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl transition-all duration-300 animate-fade-in-up cursor-pointer ${
        isSelected
          ? "border-green-500/50 bg-green-500/10"
          : "hover:border-white/40 hover:bg-white/15"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards",
      }}
      onClick={() => onToggle(media.media_contact_id.toString())}
    >
      {/* Selection Indicator */}
      <div className="absolute top-4 right-4">
        <div
          className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? "bg-green-500 border-green-500"
              : "border-white/40 bg-white/10"
          }`}
        >
          {isSelected && (
            <Check className="w-3 h-3 text-white" />
          )}
        </div>
      </div>

      {/* Media Contact Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-lg mb-1">{media.name}</h3>
        <p className="text-white/80 text-sm mb-1">
          {media.designation}, {media.organization}
        </p>
        <p className="text-white/60 text-xs">{media.email}</p>
        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {media.category}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-white font-semibold text-sm">
            {media.responseRate !== undefined ? `${media.responseRate}%` : "--"}
          </div>
          <div className="text-white/60 text-xs">Response Rate</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-white font-semibold text-sm">
            {media.avgResponseTime || "--"}
          </div>
          <div className="text-white/60 text-xs">Avg Response</div>
        </div>
      </div>

      {/* Audience Reach */}
      <div className="bg-white/10 rounded-lg p-2 text-center mb-3">
        <div className="text-white font-semibold text-sm">
          {media.audienceReach || "--"}
        </div>
        <div className="text-white/60 text-xs">Audience Reach</div>
      </div>

      {/* Selection Status */}
      <div
        className={`text-center text-xs font-medium ${
          isSelected ? "text-green-300" : "text-white/60"
        }`}
      >
        {isSelected ? "Contact Selected" : "Click to Select"}
      </div>
    </div>
  );
};

const SelectMediaContacts: React.FC<SelectMediaContactsProps> = ({
  mediaContacts,
  selectedMediaContactIds,
  onMediaContactSelection,
  companyName = "the company",
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (mediaContacts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No media contacts available for this company.
        </p>
      </div>
    );
  }

  // Calculated stats
  const selectedCount = selectedMediaContactIds.length;
  const totalOutlets = mediaContacts.length;
  const avgResponseRate =
    Math.round(
      mediaContacts.reduce(
        (sum, m) => sum + (m.responseRate || 0),
        0
      ) / (mediaContacts.length || 1)
    ) || 68;

  return (
    <main className="relative z-10 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Press &{" "}
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Media Contacts
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Escalate your {companyName} complaint to the media. Our network
            includes TV news, newspapers, online publications, and consumer
            programs.
          </p>
          {/* Summary Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <Tv className="w-5 h-5 text-blue-400" />
              <span>
                {selectedCount} of {totalOutlets} outlets selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>{avgResponseRate}% average response rate</span>
            </div>
          </div>
        </div>

        {/* Media Contact Cards */}
        <div className="mb-12 flex flex-wrap gap-6 justify-center">
          {mediaContacts.map((media, index) => (
            <OutletCard
              key={media.media_contact_id}
              media={media}
              index={index}
              isSelected={selectedMediaContactIds.includes(
                media.media_contact_id.toString()
              )}
              onToggle={onMediaContactSelection}
            />
          ))}
        </div>

        {/* Selection Summary & Continue */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Contact the Media
              </h3>
              <p className="text-white/80 leading-relaxed">
                Your story will be sent to {selectedCount} selected media
                outlets. This creates public pressure for {companyName} to
                respond quickly.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {selectedCount}
                </div>
                <div className="text-white/60 text-sm">Media Outlets</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {avgResponseRate}%
                </div>
                <div className="text-white/60 text-sm">Avg Response Rate</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  400M+
                </div>
                <div className="text-white/60 text-sm">Combined Reach</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                // onClick={handleSendToMedia}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <Zap className="mr-2 w-5 h-5" />
                Send to Media Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                // onClick={handlePreviewPitch}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <Star className="mr-2 w-5 h-5" />
                Preview Media Pitch
              </button>
            </div>
            <div className="flex items-center justify-center mt-6 space-x-6 text-white/60 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-400" />
                Professional press release
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-400" />
                Media-ready story format
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-400" />
                Follow-up tracking
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </main>
  );
};

export default SelectMediaContacts;