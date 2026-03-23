'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

interface CertificateClientProps {
  userName: string
  courseTitle: string
  completionDate: string
  certId: string
}

export default function CertificateClient({ courseTitle }: CertificateClientProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      const certificateElement = document.querySelector('.relative.group') as HTMLElement
      if (!certificateElement) {
        console.error('Certificate element not found')
        return
      }

      // Use html2canvas to capture the certificate
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Download PDF
      pdf.save(`talanta-certificate-${courseTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Talanta Certificate',
          text: `I've completed ${courseTitle} on Talanta!`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        // You could add a toast notification here to confirm copy
        console.log('Link copied to clipboard')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        className="h-14 px-8 bg-neon-green text-deep-black font-black italic text-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:scale-105 transition-all"
        onClick={handleDownloadPDF}
        disabled={isDownloading}
      >
        {isDownloading ? 'GENERATING...' : 'DOWNLOAD PDF'} <Download className="ml-2 w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        className="h-14 px-8 border-white/10 text-white font-black italic text-lg hover:bg-white/5"
        onClick={handleShare}
      >
        SHARE LINK <Share2 className="ml-2 w-5 h-5" />
      </Button>
    </div>
  )
}
