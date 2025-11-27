"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Plus, X, Loader2, CheckCircle } from "lucide-react";
import { usageTypeLabels, usagePeriodLabels } from "@/lib/user-reviews";

interface ReviewFormProps {
  vpnSlug: string;
  vpnName: string;
  locale: string;
}

export function ReviewForm({ vpnSlug, vpnName, locale }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [usageType, setUsageType] = useState("");
  const [usagePeriod, setUsagePeriod] = useState("");
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const labels = {
    en: {
      writeReview: "Write a Review",
      shareExperience: `Share your experience with ${vpnName}`,
      yourRating: "Your Rating",
      clickToRate: "Click to rate",
      reviewTitle: "Review Title",
      titlePlaceholder: "Summarize your experience",
      yourReview: "Your Review",
      reviewPlaceholder: "What did you like or dislike? What did you use this VPN for?",
      yourName: "Your Name",
      namePlaceholder: "John D.",
      yourEmail: "Your Email",
      emailPlaceholder: "email@example.com",
      emailNote: "Your email won't be published",
      usageType: "What did you use it for?",
      selectUsage: "Select usage type",
      experience: "How long have you used it?",
      selectExperience: "Select experience",
      pros: "Pros (optional)",
      addPro: "Add another pro",
      cons: "Cons (optional)",
      addCon: "Add another con",
      submit: "Submit Review",
      submitting: "Submitting...",
      cancel: "Cancel",
      success: "Thank you for your review!",
      successMessage: "Your review has been submitted and is pending moderation.",
      submitAnother: "Submit Another Review",
      error: "Something went wrong. Please try again.",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      ratingRequired: "Please select a rating",
      newsletterConsent: "Yes, I want to receive VPN deals and tips via email",
    },
    nl: {
      writeReview: "Schrijf een Review",
      shareExperience: `Deel je ervaring met ${vpnName}`,
      yourRating: "Jouw Beoordeling",
      clickToRate: "Klik om te beoordelen",
      reviewTitle: "Review Titel",
      titlePlaceholder: "Vat je ervaring samen",
      yourReview: "Jouw Review",
      reviewPlaceholder: "Wat vond je goed of slecht? Waarvoor heb je deze VPN gebruikt?",
      yourName: "Je Naam",
      namePlaceholder: "Jan de V.",
      yourEmail: "Je E-mail",
      emailPlaceholder: "email@voorbeeld.nl",
      emailNote: "Je e-mail wordt niet gepubliceerd",
      usageType: "Waarvoor heb je het gebruikt?",
      selectUsage: "Selecteer gebruik",
      experience: "Hoe lang gebruik je het al?",
      selectExperience: "Selecteer ervaring",
      pros: "Voordelen (optioneel)",
      addPro: "Voeg voordeel toe",
      cons: "Nadelen (optioneel)",
      addCon: "Voeg nadeel toe",
      submit: "Verstuur Review",
      submitting: "Versturen...",
      cancel: "Annuleren",
      success: "Bedankt voor je review!",
      successMessage: "Je review is ingediend en wacht op goedkeuring.",
      submitAnother: "Nog een Review Schrijven",
      error: "Er ging iets mis. Probeer het opnieuw.",
      required: "Dit veld is verplicht",
      invalidEmail: "Voer een geldig e-mailadres in",
      ratingRequired: "Selecteer een beoordeling",
      newsletterConsent: "Ja, ik wil graag VPN deals en tips ontvangen per email",
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;
  const usageLabels = usageTypeLabels[locale] || usageTypeLabels.en;
  const periodLabels = usagePeriodLabels[locale] || usagePeriodLabels.en;

  const addPro = () => setPros([...pros, ""]);
  const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index));
  const updatePro = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const addCon = () => setCons([...cons, ""]);
  const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index));
  const updateCon = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  const resetForm = () => {
    setRating(0);
    setTitle("");
    setContent("");
    setAuthorName("");
    setAuthorEmail("");
    setUsageType("");
    setUsagePeriod("");
    setPros([""]);
    setCons([""]);
    setNewsletterConsent(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (rating === 0) {
      setError(t.ratingRequired);
      return;
    }
    if (!title.trim() || !content.trim() || !authorName.trim() || !authorEmail.trim()) {
      setError(t.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
      setError(t.invalidEmail);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vpnSlug,
          rating,
          title: title.trim(),
          content: content.trim(),
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          usageType: usageType || undefined,
          usagePeriod: usagePeriod || undefined,
          userPros: pros.filter((p) => p.trim()),
          userCons: cons.filter((c) => c.trim()),
          locale,
          newsletterConsent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setIsSubmitted(true);
      resetForm();
    } catch {
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-500">
        <CardContent className="py-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t.success}</h3>
          <p className="text-muted-foreground mb-4">{t.successMessage}</p>
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setIsOpen(true);
            }}
          >
            {t.submitAnother}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isOpen) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <Button onClick={() => setIsOpen(true)} size="lg">
            <Star className="mr-2 h-5 w-5" />
            {t.writeReview}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.writeReview}</CardTitle>
        <p className="text-muted-foreground">{t.shareExperience}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>{t.yourRating}</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating === 0 ? t.clickToRate : `${rating}/5`}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t.reviewTitle}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              maxLength={100}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">{t.yourReview}</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t.reviewPlaceholder}
              rows={5}
              maxLength={2000}
            />
          </div>

          {/* Usage Type & Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.usageType}</Label>
              <Select value={usageType} onValueChange={setUsageType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectUsage} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(usageLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.experience}</Label>
              <Select value={usagePeriod} onValueChange={setUsagePeriod}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectExperience} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(periodLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pros */}
          <div className="space-y-2">
            <Label>{t.pros}</Label>
            <div className="space-y-2">
              {pros.map((pro, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={pro}
                    onChange={(e) => updatePro(index, e.target.value)}
                    placeholder={`Pro ${index + 1}`}
                    maxLength={100}
                  />
                  {pros.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePro(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {pros.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addPro}>
                  <Plus className="h-4 w-4 mr-1" />
                  {t.addPro}
                </Button>
              )}
            </div>
          </div>

          {/* Cons */}
          <div className="space-y-2">
            <Label>{t.cons}</Label>
            <div className="space-y-2">
              {cons.map((con, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={con}
                    onChange={(e) => updateCon(index, e.target.value)}
                    placeholder={`Con ${index + 1}`}
                    maxLength={100}
                  />
                  {cons.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCon(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {cons.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addCon}>
                  <Plus className="h-4 w-4 mr-1" />
                  {t.addCon}
                </Button>
              )}
            </div>
          </div>

          {/* Author Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="authorName">{t.yourName}</Label>
              <Input
                id="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder={t.namePlaceholder}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorEmail">{t.yourEmail}</Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
              />
              <p className="text-xs text-muted-foreground">{t.emailNote}</p>
            </div>
          </div>

          {/* Newsletter Consent */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="newsletterConsent"
              checked={newsletterConsent}
              onCheckedChange={(checked) => setNewsletterConsent(checked === true)}
            />
            <label
              htmlFor="newsletterConsent"
              className="text-sm leading-relaxed cursor-pointer"
            >
              {t.newsletterConsent}
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.submit
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
            >
              {t.cancel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
