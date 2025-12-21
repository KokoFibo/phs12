<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Exports\DataumatExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Attachment;

class SendAttachmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $toEmails;
    public $data;
    public $filters;
    public $totalData;
    public $tanggalExport;
    public $emailExcel;
    public $emailPdf;

    public function __construct($to, $data, $filters, $totalData, $tanggalExport, $email_excel, $email_pdf)
    {
        $this->toEmails = is_array($to) ? $to : [$to];
        $this->data = $data;
        $this->filters = $filters;
        $this->totalData = $totalData;
        $this->tanggalExport = $tanggalExport;
        $this->emailExcel = $email_excel;
        $this->emailPdf = $email_pdf;
    }

    public function envelope(): Envelope
    {
        $subject = 'Data Umat Pelita Hati Suci';

        $recipients = array_map(function ($email) {
            return new Address($email);
        }, $this->toEmails);

        return new Envelope(
            subject: $subject,
            to: $recipients,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.sendAttachment',
            with: [
                'data' => $this->data,
                'filters' => $this->filters,
                'totalData' => $this->totalData,
                'tanggalExport' => $this->tanggalExport,
            ]
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        // Attachment Excel
        if ($this->emailExcel) {
            // Pastikan directory temp exists
            if (!Storage::exists('temp')) {
                Storage::makeDirectory('temp');
            }

            $filename = 'data-umat-' . date('Y-m-d-H-i') . '.xlsx';
            $pathInStorage = 'temp/' . $filename;

            // Simpan file Excel di storage/app/temp/
            Excel::store(
                new DataumatExport($this->filters), // Hanya kirim filters
                $pathInStorage
            );

            $attachments[] = Attachment::fromPath(storage_path('app/' . $pathInStorage))
                ->as('data-umat.xlsx')
                ->withMime('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }

        return $attachments;
    }

    /**
     * Clean up temporary files after sending
     */
    public function __destruct()
    {
        // Cleanup temporary Excel file
        if ($this->emailExcel) {
            $filename = 'data-umat-' . date('Y-m-d-H-i') . '.xlsx';
            $pathInStorage = 'temp/' . $filename;

            if (Storage::exists($pathInStorage)) {
                Storage::delete($pathInStorage);
            }
        }
    }
}
