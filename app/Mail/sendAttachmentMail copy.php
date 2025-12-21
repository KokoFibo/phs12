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
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Attachment;


class sendAttachmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $toEmails, $data, $filters, $totalData, $tanggalExport, $email_excel, $email_pdf;

    // $to, $data, $filters, $totalData, $tanggalExport, $email_excel, $email_pdf
    public function __construct($to, $data, $filters, $totalData, $tanggalExport, $email_excel, $email_pdf)
    {
        $this->toEmails = is_array($to) ? $to : [$to];
        $this->data = $data;
        $this->filters = $filters;
        $this->totalData = $totalData;
        $this->tanggalExport = $tanggalExport;
        $this->email_excel = $email_excel;
        $this->email_pdf = $email_pdf;
    }

    public function envelope(): Envelope
    {
        $subject = 'Data umat Pelita Hati Suci';

        $recipients = array_map(function ($email) {
            return new Address($email);
        }, $this->toEmails);

        return new Envelope(
            subject: $subject,
            // from: new Address('kokofibo@gmail.com', $this->nama_pengirim),
            to: $recipients,
        );
    }


    /**
     * Get the message content definition.
     */

    public function content(): Content
    {
        return new Content(
            view: 'emails.sendAttachment'
        );
        // return new Content(
        //     view: 'emails.sendAttachment',
        //     with: [
        //         'namaPengirim' => $this->data['nama_pengirim'],
        //         'perusahaan' => $this->data['perusahaan'],
        //         'jabatan' => $this->data['jabatan'],
        //         'tujuan' => $this->data['tujuan'],
        //         'kontak' => $this->data['kontak'],
        //         'pesanTambahan' => $this->data['pesan_tambahan'] ?? '',
        //     ],
        // );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];

        // ===========================
        // 1. Attachment Excel
        // ===========================
        if ($this->email_excel) {

            $filename = 'data-umat-' . date('Y-m-d-H-i') . '.xlsx';
            $pathInStorage = 'temp/' . $filename;

            // Simpan file Excel di storage/app/temp/
            Excel::store(
                new DataumatExport($this->data, $this->filters, $this->totalData),
                $pathInStorage
            );

            $attachments[] = Attachment::fromPath(storage_path('app/temp/' . $pathInStorage))
                ->as('data-umat.xlsx')
                ->withMime('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        }
        return $attachments;
    }
}
