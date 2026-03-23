import { Certificate } from '@/components/Certificate'

export default function TestCertificatePage() {
  return (
    <div className="min-h-screen bg-deep-black py-20 px-4">
      <div className="container mx-auto max-w-5xl space-y-12">
        <h1 className="text-3xl font-black italic text-white mb-8">Certificate Preview</h1>
        <Certificate
          userName="JOHN DOE"
          courseTitle="FULL-STACK WEB DEVELOPMENT"
          completionDate="March 11, 2026"
          certId="TLNT-ABC12345-DEF6"
        />
      </div>
    </div>
  )
}
